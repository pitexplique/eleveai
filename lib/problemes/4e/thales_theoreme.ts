// Énigmes à projeter — 4e, notion thales_theoreme (la corde de la tente,
// le peintre sur l'échelle, l'ombre du chêne, la barre du toboggan avec la
// réciproque, piège du chevalet AM/MB, défi papillon du lac).
// Toutes les figures sont au bon rapport : coordonnées calculées ci-dessous.
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
type P = [number, number];
// Le point à la fraction t du chemin de a vers b.
const sur = (a: P, b: P, t: number): P => [r1(a[0] + t * (b[0] - a[0])), r1(a[1] + t * (b[1] - a[1]))];
const seg = (a: P, b: P, att = S) => `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" ${att}/>`;
const pt = (p: P, nom: string, dx: number, dy: number, coul: string = C.craie) =>
  `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${coul}"/>` +
  `<text x="${r1(p[0] + dx)}" y="${r1(p[1] + dy)}" fill="${coul}" font-size="24" text-anchor="middle">${nom}</text>`;
const BLEU_TRAIT = `stroke="${C.bleu}" stroke-width="4" stroke-linecap="round" fill="none"`;
const ROSE_TRAIT = `stroke="${C.rose}" stroke-width="4" stroke-linecap="round" fill="none"`;

// La tente : sommet A, piquets B et C au sol, corde MN à mi-hauteur environ.
const tente = () => {
  const A: P = [240, 90], B: P = [70, 360], Cc: P = [410, 360];
  const M = sur(A, B, 0.55), N = sur(A, Cc, 0.55);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une tente : sommet A, pieds B et C au sol, une corde tendue de M à N entre les deux toiles">
  <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} Z" fill="${C.jaune}" fill-opacity=".15" stroke="none"/>
  ${seg(A, B)}${seg(A, Cc)}${seg([40, 360], [440, 360], `stroke="${C.pale}" stroke-width="3"`)}
  ${seg(M, N, BLEU_TRAIT)}
  <text x="240" y="${M[1] + 40}" font-size="30" text-anchor="middle">🏮</text>
  ${pt(A, "A", 0, -16)}${pt(B, "B", -22, 8)}${pt(Cc, "C", 22, 8)}${pt(M, "M", -24, 4)}${pt(N, "N", 24, 4)}
  <text x="240" y="405" fill="${C.pale}" font-size="20" text-anchor="middle">⛺ la corde MN entre les deux toiles</text>
  </svg>`;
};

// L'échelle : pied A au sol, haut B contre le mur, C pied du mur.
// AC = 3 m, BC = 4 m, AB = 5 m, à 70 px par mètre ; M à 2 m de A sur l'échelle.
const echelle = () => {
  const A: P = [190, 360], B: P = [400, 80], Cc: P = [400, 360];
  const M = sur(A, B, 0.4);
  const N: P = [M[0], 360];
  let barreaux = "";
  for (let k = 1; k < 10; k++) {
    const a = sur(A, B, k / 10);
    barreaux += `<circle cx="${a[0]}" cy="${a[1]}" r="3" fill="${C.pale}"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une échelle AB posée contre un mur, un point M sur l'échelle et N au sol juste en dessous">
  <rect x="400" y="50" width="40" height="310" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  ${seg([40, 360], [460, 360], `stroke="${C.craie}" stroke-width="3"`)}
  ${seg(A, B)}${barreaux}
  ${seg(M, N, `stroke="${C.bleu}" stroke-width="3" stroke-dasharray="8 8" fill="none"`)}
  <text x="${M[0] - 34}" y="${M[1] - 10}" font-size="30" text-anchor="middle">🧑‍🎨</text>
  ${pt(A, "A", -18, 26)}${pt(B, "B", -24, -6)}${pt(Cc, "C", 16, 26)}${pt(M, "M", 26, 0, C.bleu)}${pt(N, "N", 0, 26, C.bleu)}
  <text x="190" y="190" fill="${C.craie}" font-size="22" text-anchor="middle">AB = 5 m</text>
  <text x="200" y="414" fill="${C.pale}" font-size="20" text-anchor="middle">(MN) // (BC) : le fil à plomb</text>
  </svg>`;
};

// L'ombre : 28 px par mètre. A = bout des deux ombres, N pied du bâton,
// M haut du bâton (1,5 m), C pied du chêne (14 m de A), B haut du chêne (10,5 m).
const ombre = () => {
  const A: P = [50, 370], N: P = [106, 370], M: P = [106, 328], Cc: P = [442, 370], B: P = [442, 76];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un bâton et un chêne debout, leurs ombres finissent au même point A ; le rayon de soleil passe par le haut des deux">
  <text x="60" y="60" font-size="36" text-anchor="middle">☀️</text>
  ${seg([30, 370], [470, 370], `stroke="${C.craie}" stroke-width="3"`)}
  ${seg(A, B, `stroke="${C.jaune}" stroke-width="3" stroke-dasharray="10 8" fill="none"`)}
  ${seg(N, M, BLEU_TRAIT)}
  ${seg(Cc, B, `stroke="${C.craie}" stroke-width="6" stroke-linecap="round" fill="none"`)}
  <circle cx="442" cy="96" r="26" fill="${C.bleu}" fill-opacity=".25" stroke="${C.craie}" stroke-width="2"/>
  ${seg(A, Cc, `stroke="${C.pale}" stroke-width="8" stroke-opacity=".5" fill="none"`)}
  ${pt(A, "A", -20, -8)}${pt(N, "N", 20, 30, C.bleu)}${pt(M, "M", -4, -14, C.bleu)}${pt(Cc, "C", 0, 34)}${pt(B, "B", -32, -4)}
  <text x="160" y="345" fill="${C.bleu}" font-size="20" text-anchor="middle">1,5 m</text>
  <text x="78" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">2 m</text>
  <text x="270" y="405" fill="${C.pale}" font-size="22" text-anchor="middle">ombre du chêne${NB}: 14 m</text>
  <text x="405" y="230" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  </svg>`;
};

// Le toboggan : 100 px par mètre. Glissière AB = 3 m, échelle AC = 2 m,
// AM = 1,2 m et AN = 0,8 m (M et N à 0,4 du chemin depuis A).
const toboggan = () => {
  const A: P = [320, 174], B: P = [92.9, 370], Cc: P = [360, 370];
  const M = sur(A, B, 0.4), N = sur(A, Cc, 0.4);
  let barreaux = "";
  for (let k = 1; k < 5; k++) {
    const a = sur(A, Cc, k / 5);
    barreaux += `<path d="M${a[0] - 14} ${a[1]} L${a[0] + 14} ${a[1]}" stroke="${C.pale}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un toboggan : glissière AB de 3 m, échelle AC de 2 m, une barre de M à N">
  ${seg([40, 370], [460, 370], `stroke="${C.craie}" stroke-width="3"`)}
  ${seg(A, B, `stroke="${C.jaune}" stroke-width="7" stroke-linecap="round" fill="none"`)}
  ${seg(A, Cc)}${barreaux}
  ${seg(M, N, BLEU_TRAIT)}
  ${pt(A, "A", 0, -16)}${pt(B, "B", -22, -8)}${pt(Cc, "C", 22, -8)}${pt(M, "M", -16, -14, C.bleu)}${pt(N, "N", 26, 6, C.bleu)}
  <text x="120" y="80" fill="${C.craie}" font-size="20">AB = 3 m${NB}; AM = 1,2 m</text>
  <text x="120" y="115" fill="${C.craie}" font-size="20">AC = 2 m${NB}; AN = 0,8 m</text>
  <text x="240" y="405" fill="${C.pale}" font-size="20" text-anchor="middle">la barre MN est-elle parallèle au sol${NB}?</text>
  </svg>`;
};

// Le chevalet : 3,5 px par cm. AB = 90 cm (AM = 60, MB = 30), AC = 75 cm
// (AN = 50), hauteur 240 px ; la barre MN est à 2/3 depuis A sur les deux pieds.
const chevalet = () => {
  const A: P = [260, 140], B: P = [56, 380], Cc: P = [366.3, 380];
  const M = sur(A, B, 2 / 3), N = sur(A, Cc, 2 / 3);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un chevalet : pieds AB et AC, barre MN parallèle au sol ; AM 60 cm, MB 30 cm, AN 50 cm">
  <rect x="200" y="20" width="120" height="90" rx="4" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  <text x="260" y="78" font-size="34" text-anchor="middle">🎨</text>
  ${seg([30, 380], [450, 380], `stroke="${C.craie}" stroke-width="3"`)}
  ${seg(A, B)}${seg(A, Cc)}
  ${seg(M, N, BLEU_TRAIT)}
  ${pt(A, "A", 28, 8)}${pt(B, "B", 0, -16)}${pt(Cc, "C", 18, -12)}${pt(M, "M", -24, 0, C.bleu)}${pt(N, "N", 24, 0, C.bleu)}
  <text x="130" y="210" fill="${C.craie}" font-size="20" text-anchor="middle">60 cm</text>
  <text x="58" y="335" fill="${C.craie}" font-size="20" text-anchor="middle">30 cm</text>
  <text x="352" y="220" fill="${C.craie}" font-size="20" text-anchor="middle">50 cm</text>
  <text x="240" y="412" fill="${C.rose}" font-size="22" text-anchor="middle">AC = ?</text>
  </svg>`;
};

// Le lac (papillon) : A entre les deux. B et C aux deux bouts du lac,
// M et N de l'autre côté de A, au quart : AM = AB ÷ 4 et MN = BC ÷ 4.
const lac = () => {
  const A: P = [360, 210], B: P = [110, 90], Cc: P = [110, 320];
  const M = sur(A, B, -0.25), N = sur(A, Cc, -0.25);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un lac entre B et C ; les droites (BM) et (CN) se croisent en A ; MN est parallèle à BC">
  <ellipse cx="110" cy="205" rx="66" ry="115" fill="${C.bleu}" fill-opacity=".22" stroke="${C.bleu}" stroke-width="3"/>
  ${seg(B, Cc, ROSE_TRAIT)}
  ${seg(B, M)}${seg(Cc, N)}
  ${seg(M, N, BLEU_TRAIT)}
  ${pt(A, "A", 0, -16)}${pt(B, "B", -24, -4)}${pt(Cc, "C", -24, 18)}${pt(M, "M", 22, 22)}${pt(N, "N", 22, -10)}
  <text x="110" y="214" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="300" y="370" fill="${C.craie}" font-size="20" text-anchor="middle">AM = 6 m${NB}; MB = 30 m${NB}; MN = 5 m</text>
  <text x="300" y="402" fill="${C.pale}" font-size="20" text-anchor="middle">(MN) // (BC)</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "thales_theoreme",
  titre: "Énigmes de Thalès",
  description: "La corde de la tente, le peintre sur l'échelle, l'ombre du chêne, la barre du toboggan, le piège du chevalet, le défi du lac : reconnaître la configuration, écrire les rapports, calculer une longueur, utiliser la réciproque.",
  problemes: [
    {
      tag: "Énigme 1 · Le camping",
      titre: "La corde de la tente",
      question: `Noé tend une corde de M à N entre les deux toiles de sa tente.<br>M est sur [AB], N est sur [AC].<br><br>Que faut-il savoir pour utiliser le théorème de Thalès ?`,
      reponse: `Thalès demande deux triangles emboîtés : AMN dans ABC.<br>M est sur [AB] et N sur [AC] : c'est déjà le cas.<br>Il manque une condition : <span class="big">(MN) parallèle à (BC)</span>.<br>La corde doit être parallèle au sol.<br>AM = AN n'est pas nécessaire. Un angle droit non plus.`,
      consigne: "Quelle condition faut-il pour utiliser Thalès ?",
      verification: { type: "qcm", choix: ["AM = AN", "Le triangle ABC est rectangle", "(MN) est parallèle à (BC)"], bonne: 2 },
      dessin: tente(),
    },
    {
      tag: "Énigme 2 · Le peintre",
      titre: "Sur l'échelle",
      question: `Sami peint un mur, debout en M sur son échelle [AB].<br>N est au sol, juste sous lui : (MN) est parallèle au mur (BC).<br><br>Quel rapport est égal à ${frac("AM", "AB")} ?`,
      reponse: `Le petit triangle est AMN, le grand est ABC.<br>Chaque rapport : un côté du petit sur le côté qui lui correspond dans le grand.<br>AM correspond à AB, AN à AC, MN à BC.<br>Donc ${frac("AM", "AB")} = <span class="big">${frac("AN", "AC")}</span> = ${frac("MN", "BC")}.<br>NC n'est pas un côté du petit triangle.`,
      consigne: "Quel rapport est égal à AM/AB ?",
      verification: { type: "qcm", choix: ["AN/AC", "AN/NC", "MN/AC"], bonne: 0 },
      dessin: echelle(),
    },
    {
      tag: "Énigme 3 · L'ombre du chêne",
      titre: "La hauteur de l'arbre",
      question: `Lina plante un bâton de 1,5 m bien droit. Son ombre mesure 2 m.<br>Au même moment, l'ombre d'un chêne mesure 14 m.<br>Le bâton et le chêne sont parallèles.<br><br>Quelle est la hauteur du chêne ?`,
      reponse: `(MN) et (BC) sont parallèles. D'après le théorème de Thalès :<br>${frac("AN", "AC")} = ${frac("MN", "BC")}, donc ${frac(2, 14)} = ${frac("1,5", "BC")}.<br>Produit en croix : 2 × BC = 1,5 × 14 = 21.<br>BC = 21 ÷ 2 = 10,5. Le chêne mesure <span class="big">10,5 m</span>.<br>Contrôle : l'ombre est 7 fois plus longue (14 ÷ 2), et 1,5 × 7 = 10,5.`,
      consigne: "Quelle est la hauteur du chêne, en mètres ?",
      verification: { type: "courte", attendus: ["10,5", "10.5"], unite: "m" },
      dessin: ombre(),
    },
    {
      tag: "Énigme 4 · Au parc",
      titre: "La barre du toboggan",
      question: `Un toboggan : la glissière AB mesure 3 m, l'échelle AC mesure 2 m.<br>Une barre relie M sur [AB] et N sur [AC].<br>AM = 1,2 m et AN = 0,8 m.<br><br>La barre (MN) est-elle parallèle au sol (BC) ?`,
      reponse: `On calcule les deux rapports séparément.<br>${frac("AM", "AB")} = ${frac("1,2", 3)} = 0,4 et ${frac("AN", "AC")} = ${frac("0,8", 2)} = 0,4.<br>Les rapports sont égaux. A, M, B et A, N, C sont alignés dans le même ordre.<br>D'après la réciproque du théorème de Thalès : <span class="big">oui, (MN) // (BC)</span>.`,
      consigne: "La barre (MN) est-elle parallèle au sol (BC) ?",
      verification: { type: "qcm", choix: ["Non, car AM et AN sont différents", "Oui, car les deux rapports valent 0,4", "On ne peut pas savoir sans mesurer les angles"], bonne: 1 },
      dessin: toboggan(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le chevalet de Léo",
      sorte: "piege",
      question: `Sur le chevalet, la barre (MN) est parallèle au sol (BC).<br>AM = 60 cm, MB = 30 cm et AN = 50 cm.<br>Léo écrit : ${frac(60, 30)} = ${frac(50, "AC")}, donc AC = 25 cm.<br><br><b>Combien mesure vraiment AC ?</b>`,
      reponse: `Léo s'est trompé ! 30 cm, c'est MB, pas un côté du grand triangle.<br>Et AC = 25 cm serait plus court que AN = 50 cm : impossible.<br>AB = 60 + 30 = 90 cm. Thalès : ${frac("AM", "AB")} = ${frac("AN", "AC")}, donc ${frac(60, 90)} = ${frac(50, "AC")}.<br>60 × AC = 50 × 90 = 4 500, donc AC = 4 500 ÷ 60 = 75.<br><span class="big">AC = 75 cm</span>.`,
      consigne: "Combien mesure AC ?",
      verification: { type: "qcm", choix: ["100 cm", "25 cm", "75 cm"], bonne: 2 },
      dessin: chevalet(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La longueur du lac",
      sorte: "defi",
      question: `Maëlle veut la longueur BC d'un lac, sans le traverser.<br>Les droites (BM) et (CN) se coupent en A, et (MN) // (BC).<br>Elle mesure AM = 6 m, MB = 30 m et MN = 5 m.<br><br>Quelle est la longueur BC du lac ?`,
      reponse: `C'est la configuration en <b>papillon</b> : Thalès s'applique.<br>Attention : MB passe par A. Donc AB = 30 − 6 = 24 m.<br>${frac("AM", "AB")} = ${frac("MN", "BC")}, donc ${frac(6, 24)} = ${frac(5, "BC")}.<br>6 × BC = 5 × 24 = 120, donc BC = 120 ÷ 6 = 20.<br>Le lac mesure <span class="big">20 m</span>.<br>Contrôle : AB est 4 fois AM, et 5 × 4 = 20.`,
      consigne: "Quelle est la longueur BC du lac, en mètres ?",
      verification: { type: "courte", attendus: ["20"], unite: "m" },
      dessin: lac(),
    },
  ],
};

export default problemes;
