// Énigmes à projeter — 4e, notion distance_droite (la nageuse et le bord,
// le champ et la route par l'aire, la largeur du canal par Pythagore, les
// rosiers à 2 m de l'allée, piège du ballon et du drapeau, défi de la table
// de la cantine). Figures au bon rapport : coordonnées calculées ci-dessous.
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const SB = S.replace(` fill="none"`, "");
const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
type P = [number, number];
const seg = (a: P, b: P, att = S) => `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" ${att}/>`;
const pt = (p: P, nom: string, dx: number, dy: number, coul: string = C.craie) =>
  `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${coul}"/>` +
  `<text x="${r1(p[0] + dx)}" y="${r1(p[1] + dy)}" fill="${coul}" font-size="24" text-anchor="middle">${nom}</text>`;
const POINTILLE = (c: string) => `stroke="${c}" stroke-width="4" stroke-dasharray="9 8" stroke-linecap="round" fill="none"`;
// Petit carré d'angle droit en H, côtés le long des directions u et v (unitaires).
const angleDroit = (H: P, u: P, v: P, t = 16) =>
  `<path d="M${r1(H[0] + t * u[0])} ${r1(H[1] + t * u[1])} L${r1(H[0] + t * (u[0] + v[0]))} ${r1(H[1] + t * (u[1] + v[1]))} L${r1(H[0] + t * v[0])} ${r1(H[1] + t * v[1])}" stroke="${C.craie}" stroke-width="2.5" fill="none"/>`;

// La piscine : bord (d) en haut, Julie en A, H pied de la perpendiculaire.
const piscine = () => {
  const A: P = [240, 300], H: P = [240, 100], K: P = [110, 100], L: P = [390, 100];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une piscine : Julie au point A, le bord (d) ; trois chemins vers le bord, AK, AH perpendiculaire, AL">
  <rect x="40" y="100" width="400" height="290" fill="${C.bleu}" fill-opacity=".18" stroke="none"/>
  ${seg([30, 100], [450, 100], `stroke="${C.craie}" stroke-width="6" stroke-linecap="round"`)}
  ${seg(A, K, POINTILLE(C.jaune))}${seg(A, L, POINTILLE(C.rose))}${seg(A, H, `stroke="${C.bleu}" stroke-width="5" stroke-linecap="round"`)}
  ${angleDroit(H, [1, 0], [0, 1])}
  ${pt(K, "K", 0, -16)}${pt(H, "H", 0, -16)}${pt(L, "L", 0, -16)}${pt(A, "A", 30, 14)}
  <text x="240" y="350" font-size="40" text-anchor="middle">🏊</text>
  <text x="60" y="60" fill="${C.craie}" font-size="22">le bord (d)</text>
  </svg>`;
};

// Le champ : 30 px par mètre. BC = 12 m, hauteur AH = 9 m.
const champ = () => {
  const A: P = [180, 60], B: P = [80, 330], Cc: P = [440, 330], H: P = [180, 330];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un champ triangulaire ABC le long d'une route ; H est le pied de la perpendiculaire issue de A sur la route">
  <rect x="20" y="338" width="440" height="40" fill="${C.pale}" fill-opacity=".3"/>
  <path d="M30 358 L60 358 M90 358 L120 358 M150 358 L180 358 M210 358 L240 358 M270 358 L300 358 M330 358 L360 358 M390 358 L420 358" stroke="${C.craie}" stroke-width="3"/>
  <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} Z" fill="${C.jaune}" fill-opacity=".25" ${SB}/>
  ${seg(A, H, POINTILLE(C.bleu))}
  ${angleDroit(H, [1, 0], [0, -1])}
  ${pt(A, "A", 0, -16)}${pt(B, "B", -20, -8)}${pt(Cc, "C", 20, -8)}${pt(H, "H", -16, -10, C.bleu)}
  <text x="198" y="200" fill="${C.bleu}" font-size="30">?</text>
  <text x="320" y="240" fill="${C.craie}" font-size="22" text-anchor="middle">aire${NB}: 54 m²</text>
  <text x="260" y="405" fill="${C.craie}" font-size="22" text-anchor="middle">BC = 12 m, le long de la route</text>
  </svg>`;
};

// Le canal : 30 px par mètre. Largeur 8 m (240 px), dérive HB = 6 m, AB = 10 m.
const canal = () => {
  const A: P = [100, 330], H: P = [100, 90], B: P = [280, 90];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un canal aux berges parallèles ; Léo nage de A à B en biais ; H est en face de A">
  <rect x="20" y="90" width="440" height="240" fill="${C.bleu}" fill-opacity=".2"/>
  ${seg([20, 90], [460, 90], `stroke="${C.craie}" stroke-width="5"`)}${seg([20, 330], [460, 330], `stroke="${C.craie}" stroke-width="5"`)}
  ${seg(A, H, POINTILLE(C.rose))}${seg(A, B, `stroke="${C.jaune}" stroke-width="5" stroke-linecap="round"`)}${seg(H, B, `stroke="${C.craie}" stroke-width="3"`)}
  ${angleDroit(H, [1, 0], [0, 1])}
  ${pt(A, "A", 0, 30)}${pt(H, "H", 0, -14)}${pt(B, "B", 0, -14)}
  <text x="190" y="70" fill="${C.craie}" font-size="22" text-anchor="middle">6 m</text>
  <text x="${r1((A[0] + B[0]) / 2 + 40)}" y="${r1((A[1] + B[1]) / 2 + 10)}" fill="${C.jaune}" font-size="22" text-anchor="middle">10 m</text>
  <text x="80" y="218" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="370" y="220" fill="${C.pale}" font-size="22" text-anchor="middle">courant →</text>
  <text x="200" y="280" font-size="34" text-anchor="middle">🏊</text>
  <text x="240" y="380" fill="${C.pale}" font-size="20" text-anchor="middle">les deux berges sont parallèles</text>
  </svg>`;
};

// Les rosiers : 40 px par mètre ; allée (d) en y = 210, parallèles à 2 m.
const rosiers = () => {
  let fleurs = "";
  for (const x of [90, 190, 290, 390]) fleurs += `<text x="${x}" y="${130 + 12}" font-size="30" text-anchor="middle">🌹</text><text x="${x + 50}" y="${290 + 12}" font-size="30" text-anchor="middle">🌹</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une allée droite (d) et des rosiers plantés à 2 mètres de l'allée, des deux côtés">
  <rect x="20" y="190" width="440" height="40" fill="${C.jaune}" fill-opacity=".25"/>
  ${seg([20, 210], [460, 210], `stroke="${C.craie}" stroke-width="4"`)}
  ${seg([20, 130], [460, 130], `stroke="${C.pale}" stroke-width="2" stroke-dasharray="4 8"`)}${seg([20, 290], [460, 290], `stroke="${C.pale}" stroke-width="2" stroke-dasharray="4 8"`)}
  ${fleurs}
  ${seg([40, 210], [40, 130], `stroke="${C.bleu}" stroke-width="3"`)}${seg([40, 210], [40, 290], `stroke="${C.bleu}" stroke-width="3"`)}
  <text x="60" y="178" fill="${C.bleu}" font-size="20">2 m</text><text x="60" y="258" fill="${C.bleu}" font-size="20">2 m</text>
  <text x="440" y="200" fill="${C.craie}" font-size="22" text-anchor="end">(d)</text>
  <text x="240" y="370" fill="${C.pale}" font-size="20" text-anchor="middle">où sont tous les rosiers${NB}?</text>
  </svg>`;
};

// Le ballon : 50 px par mètre. B drapeau, A ballon : AB = 5 m (AH = 3 m, HB = 4 m, non tracés).
const ballon = () => {
  const A: P = [330, 170], B: P = [130, 320];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un ballon en A, un drapeau en B sur la ligne de touche (d) ; le segment AB mesure 5 m">
  <rect x="20" y="40" width="440" height="280" fill="${C.bleu}" fill-opacity=".1"/>
  ${seg([20, 320], [460, 320], `stroke="${C.craie}" stroke-width="5"`)}
  ${seg(A, B, `stroke="${C.jaune}" stroke-width="4" stroke-linecap="round"`)}
  <text x="${B[0] + 10}" y="${B[1] - 6}" font-size="40" text-anchor="middle">🚩</text>
  <text x="${A[0] + 22}" y="${A[1] - 8}" font-size="34" text-anchor="middle">⚽</text>
  ${pt(A, "A", -20, -10)}${pt(B, "B", -18, 30)}
  <text x="${r1((A[0] + B[0]) / 2 - 20)}" y="${r1((A[1] + B[1]) / 2 - 12)}" fill="${C.jaune}" font-size="24" text-anchor="middle">5 m</text>
  <text x="440" y="350" fill="${C.craie}" font-size="20" text-anchor="end">ligne de touche (d)</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">distance du ballon à la ligne${NB}?</text>
  </svg>`;
};

// La table : 3 px par cm. AB = 60 cm, BC = 80 cm, AC = 100 cm, BH = 48 cm.
// H = projeté de B sur (AC) : A + 108 × (0,8 ; 0,6) = (186,4 ; 224,8).
const table = () => {
  const A: P = [100, 160], B: P = [100, 340], Cc: P = [340, 340], H: P = [186.4, 224.8];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une table en triangle rectangle en B : AB 60 cm, BC 80 cm ; Tom au coin B ; BH perpendiculaire au grand bord AC">
  <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} Z" fill="${C.jaune}" fill-opacity=".25" ${SB}/>
  ${seg(B, H, POINTILLE(C.bleu))}
  ${angleDroit(B, [1, 0], [0, -1])}${angleDroit(H, [-0.8, -0.6], [-0.6, 0.8])}
  ${pt(A, "A", -20, -6)}${pt(B, "B", -20, 22)}${pt(Cc, "C", 20, 22)}${pt(H, "H", 14, -14, C.bleu)}
  <text x="62" y="258" fill="${C.craie}" font-size="22" text-anchor="middle">60 cm</text>
  <text x="220" y="374" fill="${C.craie}" font-size="22" text-anchor="middle">80 cm</text>
  <text x="128" y="296" fill="${C.bleu}" font-size="28" text-anchor="middle">?</text>
  <text x="60" y="390" font-size="34" text-anchor="middle">🧒</text>
  <text x="350" y="200" fill="${C.pale}" font-size="20" text-anchor="middle">le grand bord [AC]</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "distance_droite",
  titre: "Énigmes de la distance d'un point à une droite",
  description: "La nageuse et le bord, le champ et la route, la largeur du canal, les rosiers de l'allée, le piège du ballon, le défi de la table : la distance d'un point à une droite se mesure sur la perpendiculaire, celle de deux parallèles aussi.",
  problemes: [
    {
      tag: "Énigme 1 · À la piscine",
      titre: "Le chemin le plus court",
      question: `Julie nage au point A. Elle a une crampe : elle veut toucher le bord (d) au plus vite.<br><br>Quel chemin est le plus court ?`,
      reponse: `Le plus court chemin d'un point à une droite est le segment <b>perpendiculaire</b> à la droite.<br>H est le pied de la perpendiculaire : c'est <span class="big">[AH]</span>.<br>Sa longueur AH est la distance du point A à la droite (d).<br>Les chemins obliques [AK] et [AL] sont plus longs.`,
      consigne: "Quel chemin vers le bord est le plus court ?",
      verification: { type: "qcm", choix: ["[AK]", "[AH], perpendiculaire au bord", "[AL]"], bonne: 1 },
      dessin: piscine(),
    },
    {
      tag: "Énigme 2 · Le champ",
      titre: "Loin de la route",
      question: `Le champ triangulaire ABC a une aire de 54 m².<br>Son côté [BC] longe la route et mesure 12 m.<br><br>À quelle distance de la route se trouve le coin A ?`,
      reponse: `La distance de A à la route (BC) est AH, avec H le pied de la perpendiculaire : c'est la hauteur du triangle.<br>Aire = BC × AH ÷ 2, donc 12 × AH ÷ 2 = 54.<br>6 × AH = 54, donc AH = 54 ÷ 6 = <span class="big">9 m</span>.`,
      consigne: "À quelle distance de la route est le coin A, en mètres ?",
      verification: { type: "courte", attendus: ["9"], unite: "m" },
      dessin: champ(),
    },
    {
      tag: "Énigme 3 · Le canal",
      titre: "La largeur du canal",
      question: `Les deux berges du canal sont parallèles. Léo le traverse à la nage, de A à B : 10 m.<br>Le courant l'a fait dériver. B est à 6 m de H, le point juste en face de A.<br><br>Quelle est la largeur du canal ?`,
      reponse: `La largeur du canal est la distance entre les deux berges parallèles : c'est AH, perpendiculaire aux deux.<br>Le triangle AHB est rectangle en H. Pythagore : AH² = AB² − HB² = 100 − 36 = 64.<br>AH = √64 = <span class="big">8 m</span>.`,
      consigne: "Quelle est la largeur du canal, en mètres ?",
      verification: { type: "courte", attendus: ["8"], unite: "m" },
      dessin: canal(),
    },
    {
      tag: "Énigme 4 · Au jardin",
      titre: "Les rosiers de l'allée",
      question: `Le jardinier plante des rosiers à 2 m exactement de l'allée droite (d), des deux côtés de l'allée.<br><br>Où sont tous les rosiers ?`,
      reponse: `Un point est à 2 m de (d) si son segment perpendiculaire à (d) mesure 2 m.<br>D'un côté de l'allée, ces points forment une droite parallèle à (d), à 2 m. De l'autre côté aussi.<br><span class="big">Deux droites parallèles à (d)</span>, une de chaque côté.`,
      consigne: "Où sont tous les points à 2 m de l'allée ?",
      verification: { type: "qcm", choix: ["Sur un cercle de rayon 2 m", "Sur une droite perpendiculaire à l'allée", "Sur deux droites parallèles à l'allée, une de chaque côté"], bonne: 2 },
      dessin: rosiers(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le ballon et le drapeau",
      sorte: "piege",
      question: `Le ballon est en A. Le drapeau B est planté sur la ligne de touche (d).<br>Le ballon est à 5 m du drapeau.<br>Nathan dit : « Le ballon est à 5 m de la ligne de touche. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Nathan s'est trompé ! [AB] n'est pas perpendiculaire à la ligne : c'est un chemin oblique.<br>La distance de A à (d) se mesure sur la perpendiculaire [AH]. Elle est plus courte que tout autre segment de A vers (d).<br>Sur le dessin, AH = 3 m et HB = 4 m (3² + 4² = 5²) : <span class="big">moins de 5 m</span>.<br>Ce serait 5 m seulement si l'angle en B était droit.`,
      consigne: "Le ballon est-il à 5 m de la ligne de touche ?",
      verification: { type: "qcm", choix: ["Non, la distance est plus petite que 5 m", "Oui, la distance est 5 m", "Non, la distance est plus grande que 5 m"], bonne: 0 },
      dessin: ballon(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La table de la cantine",
      sorte: "defi",
      question: `La table de la cantine est un triangle rectangle en B : AB = 60 cm et BC = 80 cm.<br>Tom est assis au coin B.<br><br>À quelle distance est-il du grand bord [AC] ?`,
      reponse: `Pythagore : AC² = 60² + 80² = 3 600 + 6 400 = 10 000, donc AC = 100 cm.<br>L'aire se calcule de deux façons : 60 × 80 ÷ 2 = 2 400 cm², et aussi AC × BH ÷ 2.<br>100 × BH ÷ 2 = 2 400, donc BH = 4 800 ÷ 100 = <span class="big">48 cm</span>.`,
      consigne: "À quelle distance du bord [AC] est le coin B, en cm ?",
      verification: { type: "courte", attendus: ["48"], unite: "cm" },
      dessin: table(),
    },
  ],
};

export default problemes;
