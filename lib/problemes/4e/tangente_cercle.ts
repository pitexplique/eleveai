// Énigmes à projeter — 4e, notion tangente_cercle (le Wi-Fi et la rue,
// la roue sur la route, le lampadaire et la fontaine par Pythagore, tracer
// la tangente du logo, piège du lampadaire et du point oblique, défi de
// l'horizon depuis le Piton des Neiges, 974). Figures au bon rapport sauf
// la dernière, marquée « pas à l'échelle ». 21/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
type P = [number, number];
const seg = (a: P, b: P, att = S) => `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" ${att}/>`;
const pt = (p: P, nom: string, dx: number, dy: number, coul: string = C.craie) =>
  `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${coul}"/>` +
  `<text x="${r1(p[0] + dx)}" y="${r1(p[1] + dy)}" fill="${coul}" font-size="24" text-anchor="middle">${nom}</text>`;
const POINTILLE = (c: string) => `stroke="${c}" stroke-width="3" stroke-dasharray="9 8" stroke-linecap="round" fill="none"`;
const angleDroit = (H: P, u: P, v: P, t = 16) =>
  `<path d="M${r1(H[0] + t * u[0])} ${r1(H[1] + t * u[1])} L${r1(H[0] + t * (u[0] + v[0]))} ${r1(H[1] + t * (u[1] + v[1]))} L${r1(H[0] + t * v[0])} ${r1(H[1] + t * v[1])}" stroke="${C.craie}" stroke-width="2.5" fill="none"/>`;

// Le Wi-Fi : 14 px par mètre. Rayon 10 m (140 px), rue à 12 m (168 px).
const wifi = () => {
  const O: P = [240, 180], H: P = [240, 348];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="La box Wi-Fi au centre O d'un disque de 10 m de rayon ; la rue est une droite à 12 m de O">
  <circle cx="${O[0]}" cy="${O[1]}" r="140" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  ${seg([20, 348], [460, 348], `stroke="${C.craie}" stroke-width="5"`)}
  ${seg(O, H, POINTILLE(C.rose))}${seg(O, [O[0] - 99, O[1] - 99], `stroke="${C.bleu}" stroke-width="3"`)}
  ${angleDroit(H, [1, 0], [0, -1])}
  <text x="${O[0]}" y="${O[1] + 12}" font-size="30" text-anchor="middle">📶</text>
  ${pt(H, "H", -16, 30)}
  <text x="${O[0] - 62}" y="${O[1] - 40}" fill="${C.bleu}" font-size="22" text-anchor="middle">10 m</text>
  <text x="${O[0] + 40}" y="290" fill="${C.rose}" font-size="22" text-anchor="middle">12 m</text>
  <text x="420" y="390" fill="${C.craie}" font-size="20" text-anchor="end">la rue</text>
  </svg>`;
};

// La roue : centre O, contact T sur la route.
const roue = () => {
  const O: P = [240, 200], T: P = [240, 340];
  let rayons = "";
  for (let k = 0; k < 12; k++) {
    const a = (k * Math.PI) / 6;
    rayons += seg(O, [r1(O[0] + 128 * Math.cos(a)), r1(O[1] + 128 * Math.sin(a))], `stroke="${C.pale}" stroke-width="1.5"`);
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une roue de vélo de centre O posée sur la route au point T ; le rayon OT">
  ${rayons}
  <circle cx="${O[0]}" cy="${O[1]}" r="140" fill="none" stroke="${C.craie}" stroke-width="10"/>
  ${seg([20, 345], [460, 345], `stroke="${C.craie}" stroke-width="5"`)}
  ${seg(O, T, `stroke="${C.bleu}" stroke-width="5" stroke-linecap="round"`)}
  ${pt(O, "O", 20, -10, C.bleu)}${pt(T, "T", -18, 34, C.bleu)}
  <text x="290" y="320" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="400" y="380" fill="${C.pale}" font-size="20" text-anchor="middle">la route</text>
  </svg>`;
};

// La fontaine : 7 px par mètre. OT = 15 m (105 px), OL = 39 m (273 px).
// cos(TOL) = 15 ÷ 39 = 5 ÷ 13 ; T = O + 105 × (5/13 ; −12/13).
const fontaine = () => {
  const O: P = [130, 240], T: P = [170.4, 143.1], L: P = [403, 240];
  // L'allée : la droite (TL), prolongée au-delà de T.
  const u: P = [(L[0] - T[0]) / 252, (L[1] - T[1]) / 252];
  const debut: P = [r1(T[0] - 90 * u[0]), r1(T[1] - 90 * u[1])], fin: P = [r1(L[0] + 40 * u[0]), r1(L[1] + 40 * u[1])];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une fontaine ronde de centre O et de rayon 15 m ; une allée tangente en T ; le lampadaire L sur l'allée à 39 m de O">
  <circle cx="${O[0]}" cy="${O[1]}" r="105" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="4"/>
  ${seg(debut, fin, `stroke="${C.jaune}" stroke-width="6" stroke-linecap="round"`)}
  ${seg(O, T)}${seg(O, L, POINTILLE(C.craie))}
  ${angleDroit(T, u, [(O[0] - T[0]) / 105, (O[1] - T[1]) / 105])}
  ${pt(O, "O", -6, 30)}${pt(T, "T", -14, -14)}${pt(L, "L", 22, 22)}
  <text x="${L[0]}" y="${L[1] - 16}" font-size="30" text-anchor="middle">💡</text>
  <text x="112" y="196" fill="${C.craie}" font-size="22" text-anchor="middle">15 m</text>
  <text x="270" y="266" fill="${C.craie}" font-size="22" text-anchor="middle">39 m</text>
  <text x="300" y="168" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">l'allée frôle la fontaine en T</text>
  </svg>`;
};

// Le logo : cercle de centre O, point T sur le cercle, la tangente à tracer.
const logo = () => {
  const O: P = [210, 220], T: P = [r1(210 + 130 * Math.cos(-0.6)), r1(220 + 130 * Math.sin(-0.6))];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un cercle de centre O, un point T sur le cercle et le rayon OT ; il faut tracer la tangente en T">
  <circle cx="${O[0]}" cy="${O[1]}" r="130" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <text x="${O[0] - 20}" y="${O[1] + 70}" font-size="44" text-anchor="middle">🛹</text>
  ${seg(O, T, `stroke="${C.bleu}" stroke-width="4" stroke-linecap="round"`)}
  ${pt(O, "O", -20, 6)}${pt(T, "T", 18, -12, C.bleu)}
  <text x="400" y="90" fill="${C.rose}" font-size="24" text-anchor="middle">tangente${NB}?</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">quelle droite tracer en T${NB}?</text>
  </svg>`;
};

// Le lampadaire : 30 px par mètre. Rayon 5 m (150 px), OH = 4 m (120 px),
// OA = 6 m : HA = √20 ≈ 4,47 m (134 px). H n'est pas tracé : c'est le piège.
const lampadaire = () => {
  const O: P = [200, 170], A: P = [334, 290];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un lampadaire O éclaire un disque de 5 m de rayon ; une rue droite ; le point A de la rue est à 6 m de O">
  <circle cx="${O[0]}" cy="${O[1]}" r="150" fill="${C.jaune}" fill-opacity=".18" stroke="${C.jaune}" stroke-width="3" stroke-dasharray="10 6"/>
  ${seg([20, 290], [460, 290], `stroke="${C.craie}" stroke-width="5"`)}
  ${seg(O, A, `stroke="${C.rose}" stroke-width="4" stroke-linecap="round"`)}
  ${seg(O, [O[0] - 150, O[1]], `stroke="${C.jaune}" stroke-width="3"`)}
  <text x="${O[0]}" y="${O[1] - 10}" font-size="30" text-anchor="middle">💡</text>
  ${pt(O, "O", -18, 26)}${pt(A, "A", 16, 30)}
  <text x="125" y="160" fill="${C.jaune}" font-size="22" text-anchor="middle">5 m</text>
  <text x="${r1((O[0] + A[0]) / 2 + 30)}" y="${r1((O[1] + A[1]) / 2 - 6)}" fill="${C.rose}" font-size="22" text-anchor="middle">6 m</text>
  <text x="440" y="330" fill="${C.craie}" font-size="20" text-anchor="end">la rue</text>
  <text x="240" y="395" fill="${C.pale}" font-size="20" text-anchor="middle">Mila${NB}: «${NB}6 &gt; 5, pas de lumière${NB}»</text>
  </svg>`;
};

// L'horizon : Terre de centre O hors du dessin, sommet A, tangente (AT).
// Pas à l'échelle : la montagne est très exagérée.
const horizon = () => {
  const A: P = [100, 230], T: P = [405.4, 364.1];
  const u: P = [(T[0] - A[0]) / 333.5, (T[1] - A[1]) / 333.5];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le regard depuis le sommet A frôle la Terre en T, sur l'horizon ; OT est un rayon de la Terre ; pas à l'échelle">
  <circle cx="100" cy="1060" r="760" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <path d="M40 306 L100 ${A[1]} L160 306" fill="${C.pale}" fill-opacity=".4" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  ${seg(A, [r1(T[0] + 50 * u[0]), r1(T[1] + 50 * u[1])], `stroke="${C.jaune}" stroke-width="4" stroke-linecap="round"`)}
  ${seg(T, [380.9, 420], POINTILLE(C.craie))}${seg(A, [100, 420], POINTILLE(C.craie))}
  ${angleDroit(T, [-u[0], -u[1]], [-0.402, 0.916])}
  ${pt(A, "A", -24, -6)}${pt(T, "T", 18, -14)}
  <text x="44" y="200" font-size="30" text-anchor="middle">🧍</text>
  <text x="260" y="260" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="240" y="408" fill="${C.pale}" font-size="18" text-anchor="middle">↓ vers le centre O</text>
  <text x="330" y="60" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  <text x="330" y="100" fill="${C.craie}" font-size="20" text-anchor="middle">OT = 6 400 km</text>
  <text x="330" y="130" fill="${C.craie}" font-size="20" text-anchor="middle">altitude${NB}: 3 km</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "tangente_cercle",
  titre: "Énigmes de la tangente au cercle",
  description: "Le Wi-Fi et la rue, la roue sur la route, le lampadaire de la fontaine, le logo à tracer, le piège du lampadaire, le défi de l'horizon : position d'une droite et d'un cercle, tangente perpendiculaire au rayon, Pythagore.",
  problemes: [
    {
      tag: "Énigme 1 · Le Wi-Fi",
      titre: "Le signal atteint-il la rue ?",
      question: `La box Wi-Fi est au point O. Son signal couvre un disque de 10 m de rayon.<br>La rue est une droite. La distance de O à la rue est OH = 12 m.<br><br>Que peut-on dire de la rue et du cercle ?`,
      reponse: `On compare la distance du centre à la droite avec le rayon.<br>OH = 12 m et le rayon mesure 10 m : 12 &gt; 10.<br>La droite et le cercle n'ont <span class="big">aucun point commun</span> : le signal n'atteint pas la rue.<br>Avec OH = 10 m, la rue serait tangente. Avec OH &lt; 10 m, elle couperait le cercle en deux points.`,
      consigne: "Que peut-on dire de la rue et du cercle ?",
      verification: { type: "qcm", choix: ["La rue ne touche pas le cercle : pas de signal", "La rue est tangente au cercle", "La rue coupe le cercle en deux points"], bonne: 0 },
      dessin: wifi(),
    },
    {
      tag: "Énigme 2 · À vélo",
      titre: "La roue sur la route",
      question: `La roue du vélo touche la route en un seul point T : la route est tangente à la roue.<br>O est le centre de la roue.<br><br>Quel angle le rayon [OT] fait-il avec la route ?`,
      reponse: `Une tangente à un cercle est perpendiculaire au rayon, au point de contact.<br>Donc (OT) est perpendiculaire à la route : l'angle mesure <span class="big">90°</span>.<br>Sur une route plate, le rayon qui touche le sol est toujours vertical.`,
      consigne: "Quel angle (OT) fait-il avec la route, en degrés ?",
      verification: { type: "courte", attendus: ["90"], unite: "°" },
      dessin: roue(),
    },
    {
      tag: "Énigme 3 · Au parc",
      titre: "Le lampadaire de la fontaine",
      question: `La fontaine du parc est ronde : centre O, rayon 15 m.<br>Une allée droite la frôle en T : elle est tangente au bord.<br>Le lampadaire L est sur l'allée, à 39 m du centre O.<br><br>Quelle distance sépare le lampadaire du point T ?`,
      reponse: `La tangente est perpendiculaire au rayon : le triangle OTL est rectangle en T.<br>Pythagore : TL² = OL² − OT² = 39² − 15² = 1 521 − 225 = 1 296.<br>TL = √1 296 = <span class="big">36 m</span>.<br>Contrôle : 36² + 15² = 1 296 + 225 = 1 521 = 39².`,
      consigne: "Quelle est la distance TL, en mètres ?",
      verification: { type: "courte", attendus: ["36"], unite: "m" },
      dessin: fontaine(),
    },
    {
      tag: "Énigme 4 · Le logo",
      titre: "Tracer la tangente",
      question: `Pour le logo du club de skate, Inès trace un cercle de centre O et place un point T sur le cercle.<br>Elle veut tracer la tangente au cercle en T.<br><br>Quelle droite doit-elle tracer ?`,
      reponse: `La tangente en T est perpendiculaire au rayon [OT], et elle passe par T.<br>Avec l'équerre, on trace la <span class="big">perpendiculaire à (OT) passant par T</span>.<br>La médiatrice de [OT] ne passe pas par T : elle coupe le cercle en deux points.`,
      consigne: "Quelle droite est la tangente en T ?",
      verification: { type: "qcm", choix: ["La parallèle à (OT) passant par T", "La médiatrice de [OT]", "La perpendiculaire à (OT) passant par T"], bonne: 2 },
      dessin: logo(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La lumière dans la rue",
      sorte: "piege",
      question: `Un lampadaire O éclaire un disque de 5 m de rayon.<br>Mila mesure 6 m entre le lampadaire et un point A de la rue.<br>Elle dit : « 6 &gt; 5, donc la lumière n'atteint pas la rue. »<br><br><b>Combien de points le cercle a-t-il en commun avec la rue ?</b>`,
      reponse: `Mila s'est trompée ! OA = 6 m n'est pas la distance du lampadaire à la rue : [OA] est oblique.<br>La distance se mesure sur la perpendiculaire [OH]. Sur le dessin, OH = 4 m.<br>4 &lt; 5 : la rue coupe le cercle en <span class="big">deux points</span>. Une partie de la rue est éclairée.`,
      consigne: "Combien de points communs entre le cercle et la rue ?",
      verification: { type: "qcm", choix: ["Aucun", "Deux", "Un seul"], bonne: 1 },
      dessin: lampadaire(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'horizon du Piton des Neiges",
      sorte: "defi",
      question: `Lucas est au sommet du Piton des Neiges, à environ 3 km d'altitude.<br>La Terre est une boule de rayon 6 400 km. Son regard frôle la Terre en T, sur l'horizon : (AT) est tangente.<br><br>Jusqu'à quelle distance AT voit-il, arrondie au km ?`,
      reponse: `La tangente est perpendiculaire au rayon : le triangle OTA est rectangle en T.<br>OT = 6 400 km et OA = 6 400 + 3 = 6 403 km.<br>AT² = 6 403² − 6 400² = 40 998 409 − 40 960 000 = 38 409.<br>AT = √38 409 ≈ <span class="big">196 km</span>, par temps très clair.`,
      consigne: "Quelle est la distance AT, arrondie au km ?",
      verification: { type: "courte", attendus: ["196"], unite: "km" },
      dessin: horizon(),
    },
  ],
};

export default problemes;
