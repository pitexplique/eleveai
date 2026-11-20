// Énigmes à projeter — 6e, notion prop_echelle (lire une échelle, du plan vers
// la réalité, de la réalité vers le plan, retrouver l'échelle d'une maquette,
// le piège de l'unité oubliée, le défi de la barre d'échelle). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-prop-echelle.tsx) : « 1 cm pour
// 10 m » ; 1/200 = 1 cm pour 200 cm ; plan → vrai : × ; vrai → plan : ÷ ;
// retour à 1 cm. ⛔ PAS de produit en croix (BO 6e) : linéarité et retour à l'unité.
// Phrases courtes (les 6e lisent difficilement). Dessins AU RAPPORT annoncé
// (40 px pour 1 cm de plan, sauf mention), sinon « pas à l'échelle » écrit.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

const NB = " ";

// 1. Le plan de la case au 1/100 : 40 px pour 1 cm de plan (donc pour 1 m en vrai).
// Case 9 cm × 6 cm = 360 × 240 px. Salon 5 × 4 cm (200 × 160 px), chambre
// 4 × 4 cm (160 × 160 px), varangue 9 × 2 cm (360 × 80 px).
const caseCreole = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le plan d'une case créole : un salon, une chambre et une varangue ; l'échelle est un centième">
  <rect x="60" y="80" width="200" height="160" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>
  <rect x="260" y="80" width="160" height="160" fill="${C.rose}" fill-opacity=".1" stroke="${C.craie}" stroke-width="4"/>
  <rect x="60" y="240" width="360" height="80" fill="${C.jaune}" fill-opacity=".14" stroke="${C.craie}" stroke-width="4"/>
  <path d="M150 240 L190 240" stroke="${C.jaune}" stroke-width="6" fill="none"/>
  <path d="M320 240 L360 240" stroke="${C.jaune}" stroke-width="6" fill="none"/>
  <text x="160" y="168" fill="${C.craie}" font-size="26" text-anchor="middle">salon</text>
  <text x="340" y="168" fill="${C.craie}" font-size="26" text-anchor="middle">chambre</text>
  <text x="240" y="290" fill="${C.craie}" font-size="26" text-anchor="middle">varangue</text>
  <text x="60" y="52" fill="${C.pale}" font-size="22" text-anchor="start">plan de la case</text>
  <text x="300" y="52" fill="${C.craie}" font-size="24" text-anchor="start">échelle</text>
  ${svgFrac(420, 44, 1, 100, C.rose, 26)}
  <text x="240" y="380" fill="${C.rose}" font-size="24" text-anchor="middle">Que veut dire cette échelle${NB}?</text>
  </svg>`;

// 2. La carte des pistes : 40 px pour 1 cm de carte. Barre de 1 cm = 40 px.
// Le télésiège : 6 cm = 240 px, de (100 ; 330) à (100 + 240·cos 30° ; 330 − 240·sin 30°)
// = (307,8 ; 210).
const ski = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une carte des pistes de ski ; le télésiège mesure 6 centimètres sur la carte ; 1 centimètre représente 250 mètres">
  <path d="M30 350 L170 170 L250 240 L350 90 L460 350 Z" fill="${C.pale}" fill-opacity=".15" stroke="${C.pale}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M100 330 L307.8 210" stroke="${C.rose}" stroke-width="5" stroke-linecap="round" fill="none"/>
  <circle cx="100" cy="330" r="8" fill="${C.rose}"/><circle cx="307.8" cy="210" r="8" fill="${C.rose}"/>
  <text x="330" y="205" font-size="34" text-anchor="start">🚡</text>
  <text x="196" y="306" fill="${C.rose}" font-size="22" text-anchor="start">télésiège : 6 cm</text>
  <path d="M40 50 L80 50 M40 42 L40 58 M80 42 L80 58" stroke="${C.craie}" stroke-width="4" fill="none"/>
  <text x="92" y="58" fill="${C.craie}" font-size="22" text-anchor="start">1 cm sur la carte = 250 m</text>
  <text x="240" y="395" fill="${C.rose}" font-size="24" text-anchor="middle">Combien de km en vrai${NB}?</text>
  </svg>`;

// 3. Le terrain de basket, en vrai : 28 m × 15 m, dessiné à 12 px pour 1 m
// (336 × 180 px, de x = 72 à 408, de y = 110 à 290). Rond central de rayon 1,8 m ≈ 22 px.
const basket = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un terrain de basket de 28 mètres sur 15 mètres ; quelle largeur sur le plan ?">
  <rect x="72" y="110" width="336" height="180" fill="${C.jaune}" fill-opacity=".14" stroke="${C.craie}" stroke-width="4"/>
  <path d="M240 110 L240 290" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <circle cx="240" cy="200" r="22" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M72 170 L140 170 L140 230 L72 230 M408 170 L340 170 L340 230 L408 230" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <path d="M72 82 L408 82 M72 74 L72 90 M408 74 L408 90" stroke="${C.pale}" stroke-width="3" fill="none"/>
  <text x="240" y="70" fill="${C.craie}" font-size="24" text-anchor="middle">28 m</text>
  <text x="40" y="60" font-size="34" text-anchor="middle">🏀</text>
  <path d="M424 110 L424 290 M416 110 L432 110 M416 290 L432 290" stroke="${C.pale}" stroke-width="3" fill="none"/>
  <text x="450" y="200" fill="${C.rose}" font-size="24" text-anchor="middle" transform="rotate(90 450 200)">15 m</text>
  <text x="240" y="340" fill="${C.pale}" font-size="22" text-anchor="middle">sur le plan : 1 cm pour 2 m</text>
  <text x="240" y="390" fill="${C.rose}" font-size="24" text-anchor="middle">La largeur : ? cm sur le plan</text>
  </svg>`;

// 4. Le train miniature : la vraie locomotive (20 m) et la maquette (25 cm).
// Rapport réel 80 : impossible à dessiner lisiblement → « pas à l'échelle ».
const loco = (x: number, y: number, k: number, couleur: string) =>
  `<path d="M${x} ${y} L${x + 200 * k} ${y} L${x + 200 * k} ${y - 50 * k} L${x + 150 * k} ${y - 50 * k} L${x + 150 * k} ${y - 90 * k} L${x + 80 * k} ${y - 90 * k} L${x + 80 * k} ${y - 50 * k} L${x} ${y - 50 * k} Z" fill="${couleur}" fill-opacity=".2" stroke="${couleur}" stroke-width="4" stroke-linejoin="round"/>` +
  [30, 100, 170].map((cx) => `<circle cx="${x + cx * k}" cy="${y + 12 * k}" r="${14 * k}" fill="none" stroke="${couleur}" stroke-width="4"/>`).join("");
const train = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une vraie locomotive de 20 mètres et sa maquette de 25 centimètres">
  ${loco(40, 190, 1.7, C.bleu)}
  <text x="230" y="266" fill="${C.bleu}" font-size="24" text-anchor="middle">en vrai : 20 m</text>
  ${loco(160, 345, 0.6, C.jaune)}
  <text x="300" y="325" fill="${C.jaune}" font-size="24" text-anchor="start">maquette :</text>
  <text x="300" y="352" fill="${C.jaune}" font-size="24" text-anchor="start">25 cm</text>
  <text x="460" y="30" fill="${C.pale}" font-size="20" text-anchor="end">pas à l'échelle</text>
  <text x="240" y="405" fill="${C.rose}" font-size="24" text-anchor="middle">1 cm de maquette = ? en vrai</text>
  </svg>`;

// 5. Le plan du parc au 1/500 : 40 px pour 1 cm de plan. L'allée : 6 cm = 240 px,
// de (120 ; 220) à (360 ; 220).
const parc = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le plan d'un parc à l'échelle un cinq-centième ; l'allée mesure 6 centimètres ; Jade dit 3 000 mètres">
  <rect x="60" y="110" width="360" height="200" rx="18" fill="${C.bleu}" fill-opacity=".1" stroke="${C.pale}" stroke-width="3"/>
  <path d="M120 220 L360 220" stroke="${C.jaune}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <text x="110" y="180" font-size="36" text-anchor="middle">🌳</text>
  <text x="370" y="290" font-size="36" text-anchor="middle">🌳</text>
  <text x="240" y="268" fill="${C.craie}" font-size="24" text-anchor="middle">allée : 6 cm</text>
  <text x="60" y="80" fill="${C.craie}" font-size="24" text-anchor="start">échelle</text>
  ${svgFrac(170, 72, 1, 500, C.rose, 26)}
  <text x="240" y="370" fill="${C.pale}" font-size="22" text-anchor="middle">Jade : « 6 × 500 = 3 000 m »</text>
  <text x="240" y="405" fill="${C.rose}" font-size="24" text-anchor="middle">Une allée de 3 km${NB}?</text>
  </svg>`;

// 6. La carte des îles : 40 px pour 1 cm de carte. Barre d'échelle 4 cm = 160 px
// (de x = 40 à 200, y = 60). Trajet A → B : 6 cm = 240 px, de (110 ; 300) à (350 ; 300).
const voilier = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une carte marine : une barre d'échelle de 4 centimètres vaut 10 kilomètres ; le trajet du voilier mesure 6 centimètres">
  <rect x="20" y="20" width="440" height="380" rx="14" fill="${C.bleu}" fill-opacity=".1" stroke="${C.pale}" stroke-width="3"/>
  <path d="M40 60 L200 60 M40 50 L40 70 M80 54 L80 66 M120 54 L120 66 M160 54 L160 66 M200 50 L200 70" stroke="${C.craie}" stroke-width="4" fill="none"/>
  <text x="120" y="100" fill="${C.craie}" font-size="24" text-anchor="middle">4 cm = 10 km</text>
  <path d="M60 290 Q80 255 112 262 Q142 268 140 300 Q136 334 100 332 Q62 330 60 290 Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3"/>
  <path d="M345 270 Q382 250 410 278 Q428 310 400 334 Q368 348 350 326 Q330 300 345 270 Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3"/>
  <path d="M110 300 L350 300" stroke="${C.rose}" stroke-width="4" stroke-dasharray="12 9" fill="none"/>
  <text x="90" y="372" fill="${C.craie}" font-size="26" text-anchor="middle">île A</text>
  <text x="390" y="372" fill="${C.craie}" font-size="26" text-anchor="middle">île B</text>
  <text x="230" y="282" font-size="34" text-anchor="middle">⛵</text>
  <text x="230" y="332" fill="${C.rose}" font-size="22" text-anchor="middle">6 cm</text>
  <text x="330" y="180" fill="${C.rose}" font-size="24" text-anchor="middle">? km en vrai</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "prop_echelle",
  titre: "Énigmes sur les échelles",
  description: "Le plan de la case, le télésiège, le terrain de basket, le train miniature, le piège de l'allée, la carte du voilier.",
  problemes: [
    {
      tag: "Énigme 1 · La case créole",
      titre: "Le plan de la case",
      question: `Kenzo dessine le plan de sa case.<br>Il écrit : échelle ${frac(1, 100)}.<br><br>Que veut dire cette <b>échelle</b> ?`,
      reponse: `${frac(1, 100)} : 1 cm sur le plan pour 100 cm en vrai.<br>On garde la même unité des deux côtés.<br>Or 100 cm = 1 m.<br><span class="big">1 cm du plan vaut 1 m en vrai.</span><br>Le salon fait 5 cm sur le plan : il mesure 5 m en vrai.`,
      consigne: "Sur un plan, l'échelle est « 1 sur 100 ». Que vaut 1 cm du plan ?",
      verification: {
        type: "qcm",
        choix: ["1 cm du plan vaut 100 m en vrai", "1 cm du plan vaut 1 m en vrai", "100 cm du plan valent 1 cm en vrai"],
        bonne: 1,
      },
      dessin: caseCreole(),
    },
    {
      tag: "Énigme 2 · À la station de ski",
      titre: "Le télésiège",
      question: `Sur la carte des pistes, <b>1 cm</b> représente <b>250 m</b>.<br>Le télésiège mesure <b>6 cm</b> sur la carte.<br><br>Quelle est sa vraie longueur, en <b>kilomètres</b> ?`,
      reponse: `Du plan vers le vrai, je multiplie.<br>6 fois plus sur la carte, donc 6 fois plus en vrai : 6 × 250 = 1 500 m.<br>1 000 m = 1 km, donc 1 500 m = 1,5 km.<br>Le télésiège mesure <span class="big">1,5 km</span>.`,
      consigne: "1 cm représente 250 m. Le télésiège mesure 6 cm sur la carte. Combien de kilomètres en vrai ?",
      verification: { type: "courte", attendus: ["1,5", "1.5"], unite: "km" },
      dessin: ski(),
    },
    {
      tag: "Énigme 3 · Au basket",
      titre: "Le terrain sur le plan",
      question: `Un terrain de basket mesure <b>28 m</b> sur <b>15 m</b>.<br>Jules le dessine : <b>1 cm</b> pour <b>2 m</b>.<br>Pour la longueur, il trace 28 ÷ 2 = 14 cm.<br><br>Quelle <b>largeur</b> trace-t-il ?`,
      reponse: `Du vrai vers le plan, je divise.<br>Combien de fois 2 m dans 15 m ? 15 ÷ 2 = 7,5.<br>Jules trace <span class="big">7,5 cm</span>, soit 7 cm et 5 mm.<br>Un nombre à virgule, c'est normal.`,
      consigne: "1 cm pour 2 m. Le terrain a 15 m de large. Quelle largeur sur le plan ?",
      verification: { type: "courte", attendus: ["7,5", "7.5"], unite: "cm" },
      dessin: basket(),
    },
    {
      tag: "Énigme 4 · Le train miniature",
      titre: "Retrouver l'échelle",
      question: `Une vraie locomotive mesure <b>20 m</b> de long.<br>La maquette de Sacha mesure <b>25 cm</b>.<br><br>Que représente <b>1 cm</b> de la maquette, en vrai ?`,
      reponse: `Même unité des deux côtés : 20 m = 2 000 cm.<br>25 cm de maquette valent 2 000 cm en vrai.<br>Je reviens à 1 cm : 2 000 ÷ 25 = 80.<br><span class="big">1 cm pour 80 cm</span> : l'échelle est ${frac(1, 80)}.<br>Je vérifie : 25 × 80 = 2 000 cm = 20 m.`,
      consigne: "La locomotive mesure 20 m, sa maquette 25 cm. Que représente 1 cm de la maquette ?",
      verification: { type: "qcm", choix: ["1 cm pour 80 cm", "1 cm pour 8 cm", "1 cm pour 80 m"], bonne: 0 },
      dessin: train(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'allée du parc",
      sorte: "piege",
      question: `Le plan du parc est à l'échelle ${frac(1, 500)}.<br>L'allée mesure <b>6 cm</b> sur le plan.<br>Jade calcule : « 6 × 500 = 3 000 m, soit 3 km. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `${frac(1, 500)} : 1 cm du plan pour 500 <b>cm</b> en vrai, pas 500 m.<br>6 × 500 = 3 000 cm.<br>100 cm = 1 m, donc 3 000 cm = 30 m.<br><span class="big">Non : l'allée mesure 30 m.</span><br>Bon sens : une allée de 3 km dans un parc, c'est bien trop long !`,
      consigne: "Plan à l'échelle « 1 sur 500 », allée de 6 cm. Jade trouve 3 000 m. A-t-elle raison ?",
      verification: {
        type: "qcm",
        choix: ["Oui : l'allée mesure 3 km", "Non : il faut diviser, 6 ÷ 500", "Non : c'est 3 000 cm, soit 30 m"],
        bonne: 2,
      },
      dessin: parc(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La barre d'échelle",
      sorte: "defi",
      question: `Sur la carte marine, la barre d'échelle mesure <b>4 cm</b>.<br>Elle représente <b>10 km</b>.<br>Le voilier de Malo va de l'île A à l'île B.<br>Sur la carte, le trajet mesure <b>6 cm</b>.<br><br>Quelle est la vraie distance ?`,
      reponse: `4 cm valent 10 km.<br>La moitié : 2 cm valent 5 km.<br>6 cm = 4 cm + 2 cm, donc 10 + 5 = 15 km.<br>Autre chemin : 1 cm vaut 10 ÷ 4 = 2,5 km, et 6 × 2,5 = 15 km.<br>Le voilier parcourt <span class="big">15 km</span>.`,
      consigne: "La barre de 4 cm vaut 10 km. Le trajet mesure 6 cm sur la carte. Combien de kilomètres en vrai ?",
      verification: { type: "courte", attendus: ["15"], unite: "km" },
      dessin: voilier(),
    },
  ],
};

export default problemes;
