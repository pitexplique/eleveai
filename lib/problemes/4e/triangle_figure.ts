// Énigmes à projeter — 4e, notion triangle_figure (les bouées du triathlon et
// l'encadrement du troisième côté, les passes de handball et la somme des
// angles, le fanion : hauteur, médiatrice ou médiane, l'antenne relais et le
// cas d'égalité « 2 côtés et l'angle entre eux », piège du triangle 4, 5, 10
// dessiné à main levée, défi du carnet du gardien de phare : triangles
// semblables et périmètre).
// Figures exactes : bouées à 0,5 px par m avec un angle de 70° en 2 (le
// troisième côté dessiné vaut environ 487 m, aucun des choix) ; handball aux
// angles 52°, 73°, 55° (coordonnées par la loi des sinus) ; fanion 45 px par
// unité, A(0 ; 0), B(8 ; 0), C(6,5 ; 5) : hauteur x = 6,5, médiatrice x = 4 ;
// antenne 25 px par m ; carnet 40 px par cm. Le triangle du piège est
// volontairement faux, marqué « pas à l'échelle ». 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
const rad = (deg: number) => (deg * Math.PI) / 180;

// Les bouées : 0,5 px par m. Bouée 2 en (330 ; 300), bouée 1 à 300 m à
// gauche (150 px), bouée 3 à 500 m (250 px) avec un angle de 70° en 2.
const bouees = () => {
  const b2 = { x: 330, y: 300 };
  const b1 = { x: 180, y: 300 };
  const b3 = { x: r1(330 + 250 * Math.cos(rad(110))), y: r1(300 - 250 * Math.sin(rad(110))) };
  const bouee = (p: { x: number; y: number }, n: string, dx: number, dy: number, ancre: string) =>
    `<circle cx="${p.x}" cy="${p.y}" r="12" fill="${C.jaune}"/>` + txt(p.x + dx, p.y + dy, n, C.jaune, 24, ancre);
  const a1 = { x: r1(330 + 45 * Math.cos(rad(110))), y: r1(300 - 45 * Math.sin(rad(110))) };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois bouées sur l'eau : 300 m entre la bouée 1 et la bouée 2, 500 m entre la bouée 2 et la bouée 3 ; la distance entre la bouée 3 et la bouée 1 est inconnue ; l'angle en 2 peut changer">
  <text x="420" y="80" font-size="48" text-anchor="middle">🏊</text>
  <path d="M${b1.x} ${b1.y} L${b2.x} ${b2.y} L${b3.x} ${b3.y}" stroke="${C.bleu}" stroke-width="4" fill="none" stroke-linejoin="round"/>
  <path d="M${b3.x} ${b3.y} L${b1.x} ${b1.y}" stroke="${C.rose}" stroke-width="3" stroke-dasharray="9 7" fill="none"/>
  <path d="M285 300 A45 45 0 0 1 ${a1.x} ${a1.y}" stroke="${C.pale}" stroke-width="3" fill="none"/>
  ${bouee(b1, "1", -22, 8, "end")}
  ${bouee(b2, "2", 22, 8, "start")}
  ${bouee(b3, "3", 0, -22, "middle")}
  ${txt(255, 336, "300 m", C.craie, 22)}
  ${txt(304, 180, "500 m", C.craie, 22, "start")}
  ${txt(196, 186, "?", C.rose, 30, "end")}
  ${txt(240, 385, "l'angle en 2 peut changer", C.pale, 22)}
  </svg>`;
};

// Le handball : Léo en (80 ; 360), Inès en (400 ; 360), base 320 px.
// Angle 52° en Léo, 73° en Inès : Malo en (310 ; 65,6) (loi des sinus,
// vérifié depuis les deux sommets).
const handball = () => {
  const L = { x: 80, y: 360 };
  const I = { x: 400, y: 360 };
  const lm = (320 * Math.sin(rad(73))) / Math.sin(rad(55));
  const M = { x: r1(80 + lm * Math.cos(rad(52))), y: r1(360 - lm * Math.sin(rad(52))) };
  const aL = { x: r1(80 + 45 * Math.cos(rad(52))), y: r1(360 - 45 * Math.sin(rad(52))) };
  const aI = { x: r1(400 + 45 * Math.cos(rad(107))), y: r1(360 - 45 * Math.sin(rad(107))) };
  // Arc en Malo : rayon 35 sur les directions vers Léo et vers Inès.
  const u = (p: { x: number; y: number }) => {
    const d = Math.hypot(p.x - M.x, p.y - M.y);
    return { x: (p.x - M.x) / d, y: (p.y - M.y) / d };
  };
  const uL = u(L), uI = u(I);
  const p1 = { x: r1(M.x + 35 * uL.x), y: r1(M.y + 35 * uL.y) };
  const p2 = { x: r1(M.x + 35 * uI.x), y: r1(M.y + 35 * uI.y) };
  const bis = { x: uL.x + uI.x, y: uL.y + uI.y };
  const nb = Math.hypot(bis.x, bis.y);
  const q = { x: M.x + (62 * bis.x) / nb, y: M.y + (62 * bis.y) / nb };
  const joueur = (p: { x: number; y: number }) => `<circle cx="${p.x}" cy="${p.y}" r="9" fill="${C.bleu}"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois joueurs de handball forment un triangle : l'angle en Léo mesure 52 degrés, l'angle en Inès 73 degrés, l'angle en Malo est inconnu">
  <text x="420" y="70" font-size="44" text-anchor="middle">🤾</text>
  <path d="M${L.x} ${L.y} L${I.x} ${I.y} L${M.x} ${M.y} Z" fill="${C.jaune}" fill-opacity=".1" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M125 360 A45 45 0 0 0 ${aL.x} ${aL.y}" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <path d="M355 360 A45 45 0 0 1 ${aI.x} ${aI.y}" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <path d="M${p1.x} ${p1.y} A35 35 0 0 0 ${p2.x} ${p2.y}" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${joueur(L)}${joueur(I)}${joueur(M)}
  ${txt(152, 335, "52°", C.jaune, 22)}
  ${txt(338, 325, "73°", C.jaune, 22)}
  ${txt(q.x, q.y + 9, "?", C.rose, 28)}
  ${txt(80, 395, "Léo", C.craie, 22)}
  ${txt(400, 395, "Inès", C.craie, 22)}
  ${txt(M.x + 16, M.y - 6, "Malo", C.craie, 22, "start")}
  </svg>`;
};

// Le fanion : 45 px par unité, X = 40 + 45x, Y = 340 − 45y.
// A(0 ; 0) → (40 ; 340), B(8 ; 0) → (400 ; 340), C(6,5 ; 5) → (332,5 ; 115).
// Milieu M(4 ; 0) → (220 ; 340) ; pied de la hauteur H(6,5 ; 0) → (332,5 ; 340).
// Trait 1 (rose) = hauteur issue de C ; trait 2 (bleu) = médiatrice de [AB] ;
// trait 3 (jaune) = médiane issue de C.
const fanion = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un fanion en forme de triangle ABC ; trois traits numérotés 1, 2 et 3 ; des petits traits sur le côté AB montrent son milieu">
  <path d="M40 340 L400 340 L332.5 115 Z" fill="${C.jaune}" fill-opacity=".1" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M220 375 L220 100" stroke="${C.bleu}" stroke-width="4" fill="none"/>
  <path d="M332.5 115 L332.5 340" stroke="${C.rose}" stroke-width="4" fill="none"/>
  <path d="M332.5 115 L220 340" stroke="${C.jaune}" stroke-width="4" fill="none"/>
  <path d="M318.5 340 L318.5 326 L332.5 326" stroke="${C.rose}" stroke-width="2.5" fill="none"/>
  <path d="M220 326 L234 326 L234 340" stroke="${C.bleu}" stroke-width="2.5" fill="none"/>
  <path d="M123 350 L131 330 M129 350 L137 330 M303 350 L311 330 M309 350 L317 330" stroke="${C.craie}" stroke-width="2.5" fill="none"/>
  ${txt(28, 350, "A", C.craie, 24, "end")}
  ${txt(412, 350, "B", C.craie, 24, "start")}
  ${txt(332.5, 102, "C", C.craie, 24)}
  ${txt(346, 262, "1", C.rose, 26, "start")}
  ${txt(206, 140, "2", C.bleu, 26, "end")}
  ${txt(255, 242, "3", C.jaune, 26)}
  ${txt(240, 405, `la hauteur issue de C${NB}?`, C.rose, 22)}
  </svg>`;

// L'antenne : 25 px par m. Pied P (240 ; 350), sommet S (240 ; 150) à 8 m,
// ancrages G (90 ; 350) et D (390 ; 350) à 6 m.
const antenne = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une antenne relais : un mât vertical de 8 m, et deux câbles attachés au sol à 6 m du pied, de chaque côté ; le mât fait un angle droit avec le sol">
  <text x="240" y="138" font-size="40" text-anchor="middle">📡</text>
  <path d="M40 350 L440 350" stroke="${C.pale}" stroke-width="3" fill="none"/>
  <path d="M240 150 L240 350" stroke="${C.craie}" stroke-width="5" fill="none"/>
  <path d="M240 150 L90 350 M240 150 L390 350" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <path d="M226 350 L226 336 L240 336 L254 336 L254 350" stroke="${C.rose}" stroke-width="2.5" fill="none"/>
  <circle cx="90" cy="350" r="6" fill="${C.bleu}"/>
  <circle cx="390" cy="350" r="6" fill="${C.bleu}"/>
  ${txt(250, 262, "8 m", C.craie, 22, "start")}
  ${txt(165, 382, "6 m", C.craie, 22)}
  ${txt(315, 382, "6 m", C.craie, 22)}
  ${txt(148, 245, "câble", C.bleu, 20, "end")}
  ${txt(332, 245, "câble", C.bleu, 20, "start")}
  </svg>`;

// Le triangle de Lucas : dessiné à main levée, FAUX exprès.
const lucas = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle dessiné à main levée, pas à l'échelle, avec des côtés annoncés de 4 cm, 5 cm et 10 cm ; Lucas dit qu'il l'a dessiné, donc qu'il existe">
  <path d="M60 280 L420 280 L200 130 Z" fill="${C.jaune}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  ${txt(240, 314, "10 cm", C.craie, 22)}
  ${txt(116, 196, "4 cm", C.craie, 22, "end")}
  ${txt(322, 196, "5 cm", C.craie, 22, "start")}
  ${txt(240, 60, "à main levée, pas à l'échelle", C.pale, 20)}
  <rect x="30" y="340" width="420" height="58" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 377, `Lucas${NB}: «${NB}Il existe${NB}!${NB}»`, C.rose, 24)}
  </svg>`;

// Le carnet du phare : 40 px par cm. Rocher R (100 ; 330), angle droit ;
// bouée (260 ; 330) à 4 cm ; phare (100 ; 210) à 3 cm ; hypoténuse 200 px = 5 cm.
const carnet = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Sur le carnet du gardien, un triangle phare, rocher, bouée de côtés 3 cm, 4 cm et 5 cm ; le vrai triangle a la même forme et un périmètre de 360 m">
  <rect x="30" y="160" width="270" height="230" rx="10" fill="${C.pale}" fill-opacity=".1" stroke="${C.pale}" stroke-width="2"/>
  <path d="M100 330 L260 330 L100 210 Z" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M100 316 L114 316 L114 330" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${txt(180, 360, "4 cm", C.craie, 22)}
  ${txt(90, 278, "3 cm", C.craie, 22, "end")}
  ${txt(200, 256, "5 cm", C.craie, 22, "start")}
  ${txt(100, 198, "phare", C.craie, 20)}
  ${txt(100, 382, "rocher", C.craie, 20)}
  ${txt(262, 360, "bouée", C.craie, 20)}
  ${txt(175, 135, "le carnet", C.pale, 20)}
  ${txt(385, 210, "vrai triangle", C.jaune, 22)}
  ${txt(385, 245, "même forme", C.jaune, 22)}
  ${txt(385, 280, "périmètre", C.jaune, 22)}
  ${txt(385, 312, "360 m", C.jaune, 24)}
  ${txt(240, 60, `plus grand côté${NB}?`, C.rose, 24)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "triangle_figure",
  titre: "Énigmes sur le triangle",
  description: "Les bouées du triathlon, les passes de handball, le fanion, l'antenne relais, le piège du triangle 4, 5, 10, le défi du carnet du phare : inégalité triangulaire, somme des angles, hauteur, médiatrice et médiane, cas d'égalité et triangles semblables.",
  problemes: [
    {
      tag: "Énigme 1 · Le triathlon",
      titre: "Les trois bouées",
      question: `Au triathlon, on nage autour de 3 bouées.<br>De la bouée 1 à la bouée 2 : 300 m.<br>De la bouée 2 à la bouée 3 : 500 m.<br>Les trois bouées forment un vrai triangle.<br><br>Quelle distance peut-il y avoir entre la bouée 3 et la bouée 1 ?`,
      reponse: `Le troisième côté est plus petit que la somme des deux autres : 300 + 500 = 800 m.<br>Il est plus grand que leur différence : 500 − 300 = 200 m.<br>Il est donc entre 200 m et 800 m.<br>1 000 m : trop long. 150 m : trop court, 150 + 300 = 450, moins que 500.<br>La distance possible est <span class="big">650 m</span>.<br>À 200 m ou à 800 m pile, le triangle serait plat.`,
      consigne: "Quelle distance est possible entre la bouée 3 et la bouée 1 ?",
      verification: { type: "qcm", choix: ["650 m", "1 000 m", "150 m"], bonne: 0 },
      dessin: bouees(),
    },
    {
      tag: "Énigme 2 · Le handball",
      titre: "Le triangle des passes",
      question: `Léo, Inès et Malo se font des passes au handball.<br>Ils forment un triangle.<br>L'angle en Léo mesure 52°.<br>L'angle en Inès mesure 73°.<br><br>Combien mesure l'angle en Malo ?`,
      reponse: `Dans un triangle, la somme des trois angles vaut 180°.<br>On additionne les deux angles connus : 52 + 73 = 125.<br>On enlève à 180 : 180 − 125 = 55.<br>L'angle en Malo mesure <span class="big">55°</span>.<br>Contrôle : 52 + 73 + 55 = 180.`,
      consigne: "Combien mesure l'angle en Malo, en degrés ?",
      verification: { type: "courte", attendus: ["55"], unite: "°" },
      dessin: handball(),
    },
    {
      tag: "Énigme 3 · Le fanion",
      titre: "Lequel est la hauteur ?",
      question: `Nina décore un fanion en forme de triangle ABC.<br>Elle trace trois traits, numérotés 1, 2 et 3.<br>Les petits traits sur [AB] marquent son milieu.<br><br>Quel trait est la hauteur issue de C ?`,
      reponse: `La hauteur issue de C a deux conditions.<br>Elle part du sommet C. Elle coupe [AB] à angle droit.<br>Trait 2 : angle droit, mais il passe par le milieu, pas par C. C'est la médiatrice.<br>Trait 3 : il va de C au milieu, sans angle droit. C'est la médiane.<br>Trait 1 : il part de C et fait un angle droit.<br>La hauteur est le <span class="big">trait 1</span>.<br>Attention : la hauteur ne passe pas toujours par le milieu du côté.`,
      consigne: "Quel trait est la hauteur issue de C ?",
      verification: { type: "qcm", choix: ["le trait 1 (rose)", "le trait 2 (bleu)", "le trait 3 (jaune)"], bonne: 0 },
      dessin: fanion(),
    },
    {
      tag: "Énigme 4 · L'antenne relais",
      titre: "Les deux câbles",
      question: `Une antenne relais est un mât de 8 m, droit sur le sol.<br>Deux câbles la tiennent, un de chaque côté.<br>Chacun est attaché au sol à 6 m du pied du mât.<br>Les deux triangles sont égaux.<br><br>Quel cas d'égalité le prouve ?`,
      reponse: `Les deux triangles ont le même mât : 8 m.<br>Ils ont chacun un côté de 6 m au sol.<br>Entre ces deux côtés, il y a un angle droit dans les deux.<br>C'est le cas <span class="big">2 côtés et l'angle entre eux</span>.<br>On ne connaît pas les câbles : ce n'est pas le cas des 3 côtés.<br>Conclusion : les deux câbles ont la même longueur.`,
      consigne: "Quel cas d'égalité prouve que les deux triangles sont égaux ?",
      verification: { type: "qcm", choix: ["les 3 côtés", "2 côtés et l'angle entre eux", "1 côté et ses 2 angles"], bonne: 1 },
      dessin: antenne(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le triangle de Lucas",
      sorte: "piege",
      question: `Lucas veut découper un triangle dans du carton.<br>Il veut des côtés de 4 cm, 5 cm et 10 cm.<br>Il le dessine à main levée et dit : « Je l'ai dessiné, il existe ! »<br><br><b>Ce triangle peut-il exister ?</b>`,
      reponse: `Lucas s'est trompé ! Un dessin à main levée ne prouve rien.<br>On regarde le plus grand côté : 10 cm.<br>On additionne les deux autres : 4 + 5 = 9 cm.<br>9 est plus petit que 10 : les deux petits côtés ne se rejoignent pas.<br>Il manque 1 cm.<br><span class="big">Non, ce triangle n'existe pas</span>.`,
      consigne: "Le triangle de 4 cm, 5 cm et 10 cm peut-il exister ?",
      verification: { type: "qcm", choix: ["Oui, il existe", "Oui, mais il est tout plat", "Non : 4 + 5 = 9, c'est moins que 10"], bonne: 2 },
      dessin: lucas(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le carnet du phare",
      sorte: "defi",
      question: `Le gardien d'un phare dessine un triangle sur son carnet : phare, rocher, bouée.<br>Ses côtés mesurent 3 cm, 4 cm et 5 cm.<br>Le vrai triangle a la même forme.<br>Son périmètre est de 360 m.<br><br>Combien mesure son plus grand côté ?`,
      reponse: `Même forme : les triangles sont semblables.<br>Tous les côtés sont multipliés par le même nombre.<br>Le périmètre aussi est multiplié par ce nombre.<br>Périmètre du carnet : 3 + 4 + 5 = 12 cm.<br>360 ÷ 12 = 30 : chaque cm du carnet vaut 30 m.<br>Plus grand côté : 5 × 30 = 150.<br>Il mesure <span class="big">150 m</span>.<br>Contrôle : 90 + 120 + 150 = 360.`,
      consigne: "Combien mesure le plus grand côté du vrai triangle ?",
      verification: { type: "courte", attendus: ["150"], unite: "m" },
      dessin: carnet(),
    },
  ],
};

export default problemes;
