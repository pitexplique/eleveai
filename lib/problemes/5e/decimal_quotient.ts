// Énigmes à projeter — 5e, notion decimal_quotient (quotient de deux
// décimaux : décaler la virgule, ordre de grandeur). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const verre = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x + 8} ${y + 60} L${x + 36} ${y + 60} L${x + 44} ${y} Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
const jus = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une bouteille de 4,5 litres et des verres de 0,25 litre">
  <path d="M70 120 L70 90 L95 70 L95 40 L125 40 L125 70 L150 90 L150 340 L70 340 Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <text x="110" y="230" fill="${C.craie}" font-size="26" text-anchor="middle">4,5 L</text>
  ${verre(200, 200)}${verre(260, 200)}${verre(320, 200)}${verre(380, 200)}
  <text x="310" y="300" fill="${C.craie}" font-size="24" text-anchor="middle">0,25 L chacun</text>
  <text x="310" y="150" fill="${C.rose}" font-size="30" text-anchor="middle">? verres</text>
  </svg>`;

const ruban = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un ruban de 12,6 m coupé en morceaux de 0,6 m">
  <rect x="30" y="170" width="420" height="40" fill="${C.rose}" fill-opacity=".25" stroke="${C.rose}" stroke-width="3"/>
  <path d="M50 160 L50 220 M70 160 L70 220 M90 160 L90 220" stroke="${C.craie}" stroke-width="3" stroke-dasharray="5 4"/>
  <text x="60" y="150" fill="${C.craie}" font-size="20" text-anchor="middle">0,6 m</text>
  <text x="240" y="120" fill="${C.rose}" font-size="30" text-anchor="middle">12,6 m</text>
  <text x="240" y="290" fill="${C.jaune}" font-size="30" text-anchor="middle">? morceaux</text>
  <text x="240" y="380" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  </svg>`;

const mangues = () => {
  let s = "";
  for (let i = 0; i < 5; i++) s += `<ellipse cx="${130 + 32 * i}" cy="${190 - (i % 2) * 14}" rx="22" ry="16" fill="${C.jaune}" fill-opacity=".6" stroke="${C.jaune}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une balance avec 2,4 kg de mangues, le ticket indique 7,20 euros">
  <path d="M90 210 L290 210 L270 240 L110 240 Z" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  ${s}
  <rect x="120" y="250" width="140" height="90" rx="8" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <text x="190" y="305" fill="${C.bleu}" font-size="28" text-anchor="middle">2,4 kg</text>
  <rect x="320" y="120" width="120" height="160" rx="6" fill="none" stroke="${C.pale}" stroke-width="3"/>
  <text x="380" y="170" fill="${C.craie}" font-size="20" text-anchor="middle">ticket</text>
  <text x="380" y="220" fill="${C.rose}" font-size="28" text-anchor="middle">7,20 €</text>
  <text x="240" y="390" fill="${C.jaune}" font-size="26" text-anchor="middle">prix d'un kilo : ?</text>
  </svg>`;
};

const virgule = () => `<svg viewBox="0 0 480 420" role="img" aria-label="3,6 divisé par 0,12 devient 360 divisé par 12">
  <text x="240" y="120" fill="${C.craie}" font-size="50" text-anchor="middle">3,6 ÷ 0,12</text>
  <path d="M170 150 L170 220 M158 208 L170 220 L182 208 M320 150 L320 220 M308 208 L320 220 L332 208" stroke="${C.bleu}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="140" y="195" fill="${C.bleu}" font-size="24" text-anchor="end">× 100</text>
  <text x="350" y="195" fill="${C.bleu}" font-size="24">× 100</text>
  <text x="240" y="280" fill="${C.craie}" font-size="50" text-anchor="middle">360 ÷ 12</text>
  <text x="240" y="360" fill="${C.rose}" font-size="34" text-anchor="middle">= ?</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="5 pizzas coupées en demi-pizzas">
  <text x="240" y="70" fill="${C.rose}" font-size="28" text-anchor="middle">« diviser, ça rend plus petit »</text>
  ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${70 + 85 * i}" cy="190" r="36" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3"/><path d="M${70 + 85 * i} 154 L${70 + 85 * i} 226" stroke="${C.craie}" stroke-width="3"/>`).join("")}
  <text x="240" y="290" fill="${C.craie}" font-size="26" text-anchor="middle">5 pizzas, des parts de 0,5 pizza</text>
  <text x="240" y="350" fill="${C.bleu}" font-size="34" text-anchor="middle">5 ÷ 0,5 = ?</text>
  </svg>`;

const voiture = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une voiture : réservoir de 42 litres, 5,6 litres pour 100 km">
  <path d="M60 240 L100 180 L300 180 L360 240 L420 250 L420 290 L60 290 Z" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M120 190 L180 190 L180 235 L95 235 Z M200 190 L290 190 L335 235 L200 235 Z" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <circle cx="130" cy="295" r="28" fill="${C.craie}"/><circle cx="350" cy="295" r="28" fill="${C.craie}"/>
  <text x="240" y="80" fill="${C.craie}" font-size="26" text-anchor="middle">réservoir plein : 42 L</text>
  <text x="240" y="125" fill="${C.jaune}" font-size="26" text-anchor="middle">5,6 L pour 100 km</text>
  <text x="240" y="380" fill="${C.rose}" font-size="30" text-anchor="middle">? km avec un plein</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "decimal_quotient",
  titre: "Énigmes sur le quotient de deux décimaux",
  description: "Quotient de deux nombres décimaux en 5e : verres de jus, ruban coupé, prix du kilo de mangues, décaler la virgule, piège du « diviser rend plus petit », autonomie d'une voiture. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le goûter",
      titre: "Les verres de jus",
      question: `Une bouteille contient <b>4,5 L</b> de jus.<br>On remplit des verres de <b>0,25 L</b>.<br><br><b>Combien de verres</b> peut-on remplir ?`,
      reponse: `4,5 ÷ 0,25 = 450 ÷ 25 = 18.<br>On remplit <span class="big">18 verres</span>. (Vérification : 18 × 0,25 = 4,5.)`,
      consigne: "Combien de verres de 0,25 L avec 4,5 L ?",
      verification: { type: "courte", attendus: ["18"], unite: "verres" },
      dessin: jus(),
    },
    {
      tag: "Énigme 2 · L'atelier couture",
      titre: "Le ruban coupé",
      question: `Un ruban mesure <b>12,6 m</b>.<br>On le coupe en morceaux de <b>0,6 m</b>.<br><br><b>Combien de morceaux</b> obtient-on ?`,
      reponse: `12,6 ÷ 0,6 = 126 ÷ 6 = 21.<br>On obtient <span class="big">21 morceaux</span>.`,
      consigne: "Combien de morceaux de 0,6 m dans 12,6 m ?",
      verification: { type: "courte", attendus: ["21"], unite: "morceaux" },
      dessin: ruban(),
    },
    {
      tag: "Énigme 3 · Au marché",
      titre: "Le prix du kilo",
      question: `Ana achète <b>2,4 kg</b> de mangues.<br>Elle paie <b>7,20 €</b>.<br><br><b>Quel est le prix d'un kilo</b> de mangues ?`,
      reponse: `7,2 ÷ 2,4 = 72 ÷ 24 = 3.<br>Le kilo coûte <span class="big">3 €</span>.`,
      consigne: "Quel est le prix d'un kilo de mangues, en euros ?",
      verification: { type: "courte", attendus: ["3", "3,00", "3,0"], unite: "€" },
      dessin: mangues(),
    },
    {
      tag: "Énigme 4 · Le bon geste",
      titre: "On décale la virgule",
      question: `Pour calculer <b>3,6 ÷ 0,12</b>, on multiplie les deux nombres par <b>100</b>.<br><br><b>Combien vaut 3,6 ÷ 0,12 ?</b>`,
      reponse: `3,6 ÷ 0,12 = 360 ÷ 12 = <span class="big">30</span>.<br>Vérification : 30 × 0,12 = 3,6.`,
      consigne: "Combien vaut 3,6 ÷ 0,12 ?",
      verification: { type: "qcm", choix: ["0,3", "3", "30"], bonne: 2 },
      dessin: virgule(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Diviser, ça rend plus petit ?",
      sorte: "piege",
      question: `Noé dit : « Quand on divise, le résultat est toujours plus petit. »<br>Il calcule <b>5 ÷ 0,5</b> et trouve 2,5.<br><br><b>A-t-il raison ?</b> Combien vaut 5 ÷ 0,5 ?`,
      reponse: `Non ! Dans 5 pizzas, il y a 10 demi-pizzas.<br>5 ÷ 0,5 = 50 ÷ 5 = <span class="big">10</span>. Diviser par un nombre plus petit que 1 agrandit.`,
      consigne: "Combien vaut 5 ÷ 0,5 ?",
      verification: { type: "qcm", choix: ["10", "2,5", "0,1"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'autonomie de la voiture",
      sorte: "defi",
      question: `Une voiture consomme <b>5,6 L</b> d'essence pour <b>100 km</b>.<br>Son réservoir plein contient <b>42 L</b>.<br><br><b>Combien de kilomètres</b> peut-elle faire avec un plein ?`,
      reponse: `42 ÷ 5,6 = 420 ÷ 56 = 7,5 : le plein fait 7,5 fois « 100 km ».<br>7,5 × 100 = <span class="big">750 km</span>.`,
      consigne: "Combien de kilomètres avec un plein ?",
      verification: { type: "courte", attendus: ["750"], unite: "km" },
      dessin: voiture(),
    },
  ],
};

export default problemes;
