// Énigmes à projeter — 4e, notion arcs_secteurs (la grande aiguille de
// l'horloge, l'arroseur de 120°, le bout du portail, le demi-tour du manège,
// piège des deux parts de gâteau, défi de l'essuie-glace).
// Angles des dessins exacts ; rayons au bon rapport. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
type P = [number, number];
// Point du cercle de centre c et de rayon r, à l'angle a (degrés, sens inverse des aiguilles).
const sur = (c: P, r: number, a: number): P => [r1(c[0] + r * Math.cos((a * Math.PI) / 180)), r1(c[1] - r * Math.sin((a * Math.PI) / 180))];
// Le secteur de a1 à a2 (a1 < a2), en tournant dans le sens inverse des aiguilles.
const secteur = (c: P, r: number, a1: number, a2: number, att: string) => {
  const p = sur(c, r, a1), q = sur(c, r, a2);
  return `<path d="M${c[0]} ${c[1]} L${p[0]} ${p[1]} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${q[0]} ${q[1]} Z" ${att}/>`;
};
const arc = (c: P, r: number, a1: number, a2: number, att: string) => {
  const p = sur(c, r, a1), q = sur(c, r, a2);
  return `<path d="M${p[0]} ${p[1]} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${q[0]} ${q[1]}" ${att}/>`;
};
const seg = (a: P, b: P, att: string) => `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" ${att}/>`;

// L'horloge : l'aiguille passe de 12 (90°) à 3 (0°) ; arc d'un quart de tour.
const horloge = () => {
  const O: P = [240, 200];
  let marques = "";
  for (let k = 0; k < 12; k++) marques += seg(sur(O, 150, k * 30), sur(O, 136, k * 30), `stroke="${C.craie}" stroke-width="4"`);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une horloge : la grande aiguille passe du 12 au 3 ; sa pointe décrit un quart de cercle">
  <circle cx="${O[0]}" cy="${O[1]}" r="160" fill="${C.pale}" fill-opacity=".1" stroke="${C.craie}" stroke-width="5"/>
  ${marques}
  ${arc(O, 120, 0, 90, `stroke="${C.jaune}" stroke-width="8" fill="none" stroke-linecap="round"`)}
  ${seg(O, sur(O, 120, 90), `stroke="${C.pale}" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 7"`)}
  ${seg(O, sur(O, 120, 0), `stroke="${C.bleu}" stroke-width="6" stroke-linecap="round"`)}
  <circle cx="${O[0]}" cy="${O[1]}" r="8" fill="${C.craie}"/>
  <text x="240" y="78" fill="${C.craie}" font-size="24" text-anchor="middle">12</text>
  <text x="372" y="208" fill="${C.craie}" font-size="24" text-anchor="middle">3</text>
  <text x="300" y="232" fill="${C.bleu}" font-size="20" text-anchor="middle">12 cm</text>
  <text x="345" y="110" fill="${C.jaune}" font-size="30" text-anchor="middle">?</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">de 10 h à 10 h 15</text>
  </svg>`;
};

// L'arroseur : 40 px par mètre ; rayon 6 m (240 px) sur 120°, de 30° à 150°.
const arroseur = () => {
  const O: P = [240, 360];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un arroseur au point O arrose un secteur de 120 degrés et de 6 mètres de rayon">
  <rect x="10" y="20" width="460" height="380" fill="${C.jaune}" fill-opacity=".08"/>
  ${secteur(O, 240, 30, 150, `fill="${C.bleu}" fill-opacity=".25" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"`)}
  ${arc(O, 50, 30, 150, `stroke="${C.rose}" stroke-width="3" fill="none"`)}
  <text x="240" y="300" fill="${C.rose}" font-size="22" text-anchor="middle">120°</text>
  <text x="${r1(O[0] + 120 * Math.cos(Math.PI / 6) + 22)}" y="${r1(O[1] - 120 * 0.5 + 18)}" fill="${C.bleu}" font-size="22" text-anchor="middle">6 m</text>
  <text x="240" y="395" font-size="30" text-anchor="middle">💦</text>
  <circle cx="${O[0]}" cy="${O[1]}" r="6" fill="${C.craie}"/>
  <text x="240" y="190" fill="${C.craie}" font-size="26" text-anchor="middle">aire${NB}?</text>
  </svg>`;
};

// Le portail : 60 px par mètre ; battant 3 m (180 px), ouvert de 60°.
const portail = () => {
  const O: P = [90, 320];
  const ferme = sur(O, 180, 0), ouvert = sur(O, 180, 60);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Vu de dessus : un portail de 3 m tourne de 60 degrés autour de son gond O ; le bout décrit un arc">
  <rect x="40" y="300" width="50" height="40" fill="${C.pale}" fill-opacity=".5" stroke="${C.craie}" stroke-width="3"/>
  ${seg(O, ferme, `stroke="${C.pale}" stroke-width="10" stroke-linecap="round" stroke-dasharray="14 8"`)}
  ${seg(O, ouvert, `stroke="${C.craie}" stroke-width="10" stroke-linecap="round"`)}
  ${arc(O, 180, 0, 60, `stroke="${C.jaune}" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="3 10"`)}
  ${arc(O, 60, 0, 60, `stroke="${C.rose}" stroke-width="3" fill="none"`)}
  <circle cx="${O[0]}" cy="${O[1]}" r="7" fill="${C.craie}"/>
  <text x="${O[0] - 10}" y="${O[1] + 50}" fill="${C.craie}" font-size="22" text-anchor="middle">O</text>
  <text x="${O[0] + 90}" y="${O[1] - 24}" fill="${C.rose}" font-size="22" text-anchor="middle">60°</text>
  <text x="${r1(ouvert[0] / 2 + O[0] / 2 - 34)}" y="${r1(ouvert[1] / 2 + O[1] / 2 - 10)}" fill="${C.craie}" font-size="22" text-anchor="middle">3 m</text>
  <text x="${r1(sur(O, 180, 30)[0] + 34)}" y="${r1(sur(O, 180, 30)[1])}" fill="${C.jaune}" font-size="30" text-anchor="middle">?</text>
  <text x="380" y="380" font-size="40" text-anchor="middle">🚜</text>
  <text x="240" y="60" fill="${C.pale}" font-size="20" text-anchor="middle">vu de dessus</text>
  </svg>`;
};

// Le manège : rayon 5 m (160 px), demi-tour du point de départ.
const manege = () => {
  const O: P = [240, 210];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un manège vu de dessus, de centre O ; Lili est à 5 m du centre et parcourt un arc">
  <circle cx="${O[0]}" cy="${O[1]}" r="160" fill="${C.rose}" fill-opacity=".08" stroke="${C.craie}" stroke-width="4"/>
  ${arc(O, 160, 0, 180, `stroke="${C.jaune}" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="2 12"`)}
  ${seg(O, sur(O, 160, 0), `stroke="${C.bleu}" stroke-width="4"`)}
  <circle cx="${O[0]}" cy="${O[1]}" r="7" fill="${C.craie}"/>
  <text x="${O[0] - 12}" y="${O[1] + 32}" fill="${C.craie}" font-size="22" text-anchor="middle">O</text>
  <text x="320" y="200" fill="${C.bleu}" font-size="22" text-anchor="middle">5 m</text>
  <text x="${sur(O, 160, 0)[0] - 4}" y="${O[1] + 44}" font-size="34" text-anchor="middle">🎠</text>
  <text x="240" y="30" fill="${C.jaune}" font-size="22" text-anchor="middle">arc parcouru${NB}: 5π m</text>
  <text x="240" y="408" fill="${C.pale}" font-size="20" text-anchor="middle">angle${NB}?</text>
  </svg>`;
};

// Les gâteaux : 9 px par cm. Grand rayon 15 cm (135 px), petit 7,5 cm (67,5 px).
const gateaux = () => {
  const G: P = [160, 190], Pt: P = [380, 190];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux gâteaux ronds : le grand de 30 cm de diamètre avec une part de 30 degrés, le petit de 15 cm avec une part de 60 degrés">
  <circle cx="${G[0]}" cy="${G[1]}" r="135" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>
  ${secteur(G, 135, 75, 105, `fill="${C.jaune}" fill-opacity=".7" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"`)}
  <circle cx="${Pt[0]}" cy="${Pt[1]}" r="67.5" fill="${C.rose}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  ${secteur(Pt, 67.5, 60, 120, `fill="${C.rose}" fill-opacity=".6" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"`)}
  <text x="160" y="365" fill="${C.craie}" font-size="22" text-anchor="middle">Anna${NB}: 30°</text>
  <text x="160" y="395" fill="${C.pale}" font-size="20" text-anchor="middle">diamètre 30 cm</text>
  <text x="380" y="300" fill="${C.craie}" font-size="22" text-anchor="middle">Enzo${NB}: 60°</text>
  <text x="380" y="330" fill="${C.pale}" font-size="20" text-anchor="middle">diamètre 15 cm</text>
  </svg>`;
};

// L'essuie-glace : 4 px par cm ; caoutchouc de 10 cm (40 px) à 50 cm (200 px), 120°.
const essuieGlace = () => {
  const O: P = [240, 380];
  const p = sur(O, 200, 30), q = sur(O, 200, 150), pi = sur(O, 40, 150), qi = sur(O, 40, 30);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un essuie-glace tourne de 120 degrés autour de O ; il nettoie la zone entre 10 cm et 50 cm de O">
  <path d="M20 400 L60 150 Q240 110 420 150 L460 400 Z" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${p[0]} ${p[1]} A200 200 0 0 0 ${q[0]} ${q[1]} L${pi[0]} ${pi[1]} A40 40 0 0 1 ${qi[0]} ${qi[1]} Z" fill="${C.jaune}" fill-opacity=".45" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>
  ${seg(O, sur(O, 200, 30), `stroke="${C.craie}" stroke-width="3"`)}
  ${seg(qi, p, `stroke="${C.craie}" stroke-width="8" stroke-linecap="round"`)}
  <circle cx="${O[0]}" cy="${O[1]}" r="7" fill="${C.craie}"/>
  <text x="${O[0] - 22}" y="${O[1] + 8}" fill="${C.craie}" font-size="22" text-anchor="middle">O</text>
  <text x="240" y="330" fill="${C.rose}" font-size="20" text-anchor="middle">120°</text>
  <text x="${r1((qi[0] + p[0]) / 2 + 40)}" y="${r1((qi[1] + p[1]) / 2 + 30)}" fill="${C.craie}" font-size="18" text-anchor="middle">de 10 à 50 cm</text>
  <text x="240" y="250" fill="${C.craie}" font-size="26" text-anchor="middle">aire${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "arcs_secteurs",
  titre: "Énigmes des arcs et secteurs",
  description: "La grande aiguille de l'horloge, l'arroseur, le portail, le manège, le piège des deux parts de gâteau, le défi de l'essuie-glace : longueur d'un arc et aire d'un secteur, proportionnelles à l'angle.",
  problemes: [
    {
      tag: "Énigme 1 · L'horloge",
      titre: "La pointe de l'aiguille",
      question: `La grande aiguille de l'horloge de la classe mesure 12 cm.<br>De 10 h à 10 h 15, sa pointe décrit un arc de cercle.<br><br>Quelle est la longueur de cet arc, arrondie au mm ?`,
      reponse: `En 15 minutes, l'aiguille fait un quart de tour : 90° sur 360°.<br>Le tour complet mesure 2 × π × 12 = 24π cm.<br>L'arc : ${frac(90, 360)} × 24π = ${frac(1, 4)} × 24π = 6π ≈ <span class="big">18,8 cm</span>.`,
      consigne: "Quelle est la longueur de l'arc, en cm, arrondie au mm ?",
      verification: { type: "courte", attendus: ["18,8", "18.8", "6π"], unite: "cm" },
      dessin: horloge(),
    },
    {
      tag: "Énigme 2 · L'arroseur",
      titre: "La pelouse arrosée",
      question: `Un arroseur tourne d'un angle de 120°. Il arrose jusqu'à 6 m.<br><br>Quelle aire de pelouse arrose-t-il, arrondie au dixième de m² ?`,
      reponse: `La zone arrosée est un secteur de 120° dans un disque de rayon 6 m.<br>Le disque entier : π × 6² = 36π m².<br>120°, c'est ${frac(120, 360)} = ${frac(1, 3)} du tour.<br>Aire : ${frac(1, 3)} × 36π = 12π ≈ <span class="big">37,7 m²</span>.`,
      consigne: "Quelle aire est arrosée, en m², arrondie au dixième ?",
      verification: { type: "courte", attendus: ["37,7", "37.7", "12π"], unite: "m²" },
      dessin: arroseur(),
    },
    {
      tag: "Énigme 3 · Le portail",
      titre: "Le bout du battant",
      question: `Le portail du champ a un seul battant de 3 m. Il s'ouvre en tournant de 60° autour de son gond O.<br><br>Quelle distance parcourt le bout du battant ?`,
      reponse: `Le bout du battant décrit un arc de cercle de centre O et de rayon 3 m.<br>Le tour complet : 2 × π × 3 = 6π ≈ 18,8 m.<br>60°, c'est ${frac(1, 6)} du tour : ${frac(1, 6)} × 6π = π ≈ <span class="big">3,1 m</span>.<br>4,7 m, c'est une aire : π × 3² ÷ 6, en m².`,
      consigne: "Quelle distance parcourt le bout du battant ?",
      verification: { type: "qcm", choix: ["environ 18,8 m", "environ 4,7 m", "environ 3,1 m"], bonne: 2 },
      dessin: portail(),
    },
    {
      tag: "Énigme 4 · Le manège",
      titre: "De combien a-t-il tourné ?",
      question: `Lili est assise sur un cheval du manège, à 5 m du centre.<br>Entre deux arrêts, elle parcourt un arc de 5π m, environ 15,7 m.<br><br>De quel angle le manège a-t-il tourné ?`,
      reponse: `Un tour complet : 2 × π × 5 = 10π m, environ 31,4 m.<br>5π, c'est la moitié de 10π.<br>La moitié du tour, c'est la moitié de 360° : <span class="big">180°</span>, un demi-tour.`,
      consigne: "De quel angle le manège a-t-il tourné ?",
      verification: { type: "qcm", choix: ["90°", "180°", "270°"], bonne: 1 },
      dessin: manege(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux parts de gâteau",
      sorte: "piege",
      question: `Deux gâteaux ronds : le grand a 30 cm de diamètre, le petit 15 cm.<br>Anna prend une part de 30° du grand. Enzo prend une part de 60° du petit.<br>Enzo dit : « Mon angle est double, donc ma part est plus grosse. »<br><br><b>Quelle part est la plus grosse ?</b>`,
      reponse: `Enzo s'est trompé ! Le rayon compte aussi, et il compte au carré.<br>Anna, rayon 15 cm : ${frac(30, 360)} × π × 15² = ${frac(225, 12)}π = 18,75π cm².<br>Enzo, rayon 7,5 cm : ${frac(60, 360)} × π × 7,5² = ${frac("56,25", 6)}π = 9,375π cm².<br><span class="big">La part de 30° d'Anna</span>, deux fois plus grosse.<br>Angle × 2, mais rayon ÷ 2 donne une aire ÷ 4 : au total, ÷ 2.`,
      consigne: "Quelle part de gâteau est la plus grosse ?",
      verification: { type: "qcm", choix: ["La part de 30° d'Anna", "La part de 60° d'Enzo", "Elles sont pareilles"], bonne: 0 },
      dessin: gateaux(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'essuie-glace",
      sorte: "defi",
      question: `Un essuie-glace tourne de 120° autour de son axe O.<br>Son caoutchouc va de 10 cm à 50 cm de O.<br><br>Quelle aire de pare-brise nettoie-t-il, arrondie au cm² ?`,
      reponse: `La zone nettoyée : le grand secteur de rayon 50 cm, moins le petit de rayon 10 cm.<br>120°, c'est ${frac(1, 3)} du tour.<br>Grand : ${frac(1, 3)} × π × 50² = ${frac(2500, 3)}π. Petit : ${frac(1, 3)} × π × 10² = ${frac(100, 3)}π.<br>Différence : ${frac(2400, 3)}π = 800π ≈ <span class="big">2 513 cm²</span>.`,
      consigne: "Quelle aire nettoie l'essuie-glace, en cm², arrondie à l'unité ?",
      verification: { type: "courte", attendus: ["2513", "2 513", "800π"], unite: "cm²" },
      dessin: essuieGlace(),
    },
  ],
};

export default problemes;
