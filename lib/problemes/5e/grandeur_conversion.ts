// Énigmes à projeter — 5e, notion grandeur_conversion (conversions de
// contenances, de masses, durées). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const etiq = (x: number, y: number, t: string, c: string = C.craie, taille = 24) =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="${taille}" text-anchor="middle">${t}</text>`;

// 135 min sur une frise : 3 px par minute (60 min = 180 px).
const film = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une frise de 135 minutes coupée en 60, 60 et 15 minutes">
  ${etiq(240, 80, "le film dure 135 min", C.craie, 28)}
  <rect x="35" y="160" width="180" height="60" fill="${C.bleu}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  <rect x="215" y="160" width="180" height="60" fill="${C.bleu}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  <rect x="395" y="160" width="45" height="60" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>
  ${etiq(125, 198, "60 min")}${etiq(305, 198, "60 min")}${etiq(417, 255, "15", C.jaune)}
  ${etiq(240, 330, "= ? h ? min", C.rose, 32)}
  </svg>`;

const bouteille = (x: number, y: number) =>
  `<path d="M${x} ${y + 30} L${x + 10} ${y + 15} L${x + 10} ${y} L${x + 22} ${y} L${x + 22} ${y + 15} L${x + 32} ${y + 30} L${x + 32} ${y + 110} L${x} ${y + 110} Z" fill="${C.rose}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
const jus = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une fontaine de 6 litres et des bouteilles de 75 centilitres">
  <rect x="40" y="90" width="130" height="200" rx="14" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="4"/>
  ${etiq(105, 200, "6 L", C.craie, 34)}
  ${bouteille(220, 140)}${bouteille(270, 140)}${bouteille(320, 140)}${bouteille(370, 140)}
  ${etiq(320, 290, "75 cL chacune")}
  ${etiq(240, 370, "? bouteilles", C.rose, 30)}
  </svg>`;

const avion = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un vol de La Réunion à Paris : départ 22 h 40, durée 11 h 35">
  <path d="M60 220 Q240 90 420 220" stroke="${C.pale}" stroke-width="3" stroke-dasharray="8 8" fill="none"/>
  <path d="M225 140 L265 150 L250 155 L258 172 L248 172 L236 156 L222 160 Z" fill="${C.bleu}" stroke="${C.bleu}" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="60" cy="220" r="9" fill="${C.jaune}"/><circle cx="420" cy="220" r="9" fill="${C.rose}"/>
  ${etiq(70, 260, "La Réunion", C.jaune)}${etiq(70, 292, "départ 22 h 40", C.craie, 22)}
  ${etiq(410, 260, "Paris", C.rose)}${etiq(410, 292, "arrivée : ?", C.craie, 22)}
  ${etiq(240, 90, "durée : 11 h 35", C.bleu, 26)}
  ${etiq(240, 380, "tout à l'heure de La Réunion", C.pale, 20)}
  </svg>`;

const sachets = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un sac de 2,4 kg de riz et des sachets de 200 g">
  <path d="M60 120 Q60 90 90 90 L170 90 Q200 90 200 120 L210 320 L50 320 Z" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  ${etiq(130, 220, "2,4 kg", C.craie, 32)}
  ${[0, 1, 2].map((i) => `<rect x="${250 + 65 * i}" y="200" width="50" height="70" rx="6" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="3"/>`).join("")}
  ${etiq(330, 310, "200 g chacun", C.bleu)}
  ${etiq(330, 160, "? sachets", C.rose, 30)}
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une horloge : une heure et demie, colorée">
  <circle cx="240" cy="200" r="120" fill="none" stroke="${C.craie}" stroke-width="5"/>
  <path d="M240 200 L240 80 A120 120 0 0 1 240 320 Z" fill="${C.jaune}" fill-opacity=".35"/>
  <path d="M240 200 L240 110" stroke="${C.craie}" stroke-width="5" stroke-linecap="round"/>
  ${etiq(240, 60, "« 1,5 h = 1 h 50 min »", C.rose, 28)}
  ${etiq(240, 375, "0,5 h, c'est une demi-heure", C.pale, 22)}
  </svg>`;

const robinet = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un robinet qui fuit, une goutte par seconde">
  <path d="M80 90 L260 90 L260 130 L230 130 L230 160 L200 160 L200 130 L80 130 Z" fill="${C.pale}" fill-opacity=".3" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M215 190 Q205 208 215 214 Q225 208 215 190 Z M215 240 Q205 258 215 264 Q225 258 215 240 Z" fill="${C.bleu}" stroke="${C.bleu}" stroke-width="2"/>
  ${etiq(360, 180, "1 goutte par seconde", C.bleu, 22)}
  ${etiq(360, 220, "20 gouttes = 1 mL", C.craie, 22)}
  <path d="M150 300 L280 300 L270 370 L160 370 Z" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  ${etiq(385, 350, "en 1 jour : ? L", C.rose, 28)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "grandeur_conversion",
  titre: "Énigmes sur les conversions et les durées",
  description: "Conversions et durées en 5e : la durée d'un film, des bouteilles de 75 cL, le vol La Réunion – Paris, des sachets de riz, piège du 1,5 h, le robinet qui fuit. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Au cinéma",
      titre: "La durée du film",
      question: `Un film dure <b>135 minutes</b>.<br><br><b>Combien d'heures et de minutes</b> cela fait-il ?`,
      reponse: `1 h = 60 min. 135 = 60 + 60 + 15.<br>Le film dure <span class="big">2 h 15 min</span>.`,
      consigne: "Combien d'heures et de minutes dure le film ? (ex. 1h20)",
      verification: { type: "courte", attendus: ["2h15", "2h15min"] },
      dessin: film(),
    },
    {
      tag: "Énigme 2 · La fête",
      titre: "Les bouteilles",
      question: `On verse <b>6 L</b> de jus dans des bouteilles de <b>75 cL</b>.<br><br><b>Combien de bouteilles</b> remplit-on ?`,
      reponse: `Même unité : 6 L = 600 cL.<br>600 ÷ 75 = 8. On remplit <span class="big">8 bouteilles</span>.`,
      consigne: "Combien de bouteilles de 75 cL remplit-on ?",
      verification: { type: "courte", attendus: ["8"], unite: "bouteilles" },
      dessin: jus(),
    },
    {
      tag: "Énigme 3 · En avion",
      titre: "Le vol de nuit",
      question: `Un avion quitte La Réunion à <b>22 h 40</b>. Le vol dure <b>11 h 35</b>.<br><br><b>À quelle heure arrive-t-il</b>, heure de La Réunion ?`,
      reponse: `22 h 40 + 11 h = 33 h 40, puis + 35 min = 34 h 15.<br>34 h, c'est 24 h + 10 h : il arrive le lendemain à <span class="big">10 h 15</span>.`,
      consigne: "À quelle heure arrive l'avion ? (ex. 9h05)",
      verification: { type: "courte", attendus: ["10h15", "10h15min"] },
      dessin: avion(),
    },
    {
      tag: "Énigme 4 · À l'épicerie",
      titre: "Les sachets de riz",
      question: `Un épicier a un sac de <b>2,4 kg</b> de riz.<br>Il fait des sachets de <b>200 g</b>.<br><br><b>Combien de sachets</b> fait-il ?`,
      reponse: `Même unité : 2,4 kg = 2 400 g.<br>2 400 ÷ 200 = <span class="big">12 sachets</span>.`,
      consigne: "Combien de sachets de 200 g fait-il ?",
      verification: { type: "courte", attendus: ["12"], unite: "sachets" },
      dessin: sachets(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Une heure et demie",
      sorte: "piege",
      question: `Jade dit : « 1,5 h, c'est 1 h 50 min. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! 0,5 h, c'est la moitié d'une heure : 30 min.<br>1,5 h = <span class="big">1 h 30 min</span>. Les heures ne se comptent pas par 100.`,
      consigne: "Combien vaut 1,5 h ?",
      verification: { type: "qcm", choix: ["1 h 50 min", "1 h 30 min", "1 h 05 min"], bonne: 1 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le robinet qui fuit",
      sorte: "defi",
      question: `Un robinet fuit : <b>1 goutte par seconde</b>. Il faut <b>20 gouttes</b> pour faire 1 mL.<br><br><b>Combien de litres</b> perd-on en un jour ?`,
      reponse: `Un jour = 24 × 60 × 60 = 86 400 s, donc 86 400 gouttes.<br>86 400 ÷ 20 = 4 320 mL = <span class="big">4,32 L</span> par jour !`,
      consigne: "Combien de litres perd-on en un jour ?",
      verification: { type: "courte", attendus: ["4,32", "4.32"], unite: "L" },
      dessin: robinet(),
    },
  ],
};

export default problemes;
