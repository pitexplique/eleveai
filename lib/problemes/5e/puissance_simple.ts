// Énigmes à projeter — 5e, notion puissance_simple (carré, cube, puissances
// simples ; programme 2026 de cycle 4, en vigueur en 5e). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Une terrasse de 7 × 7 carreaux de 40 px.
const terrasse = () => {
  let s = "";
  for (let k = 0; k <= 7; k++) {
    s += `<path d="M${100 + 40 * k} 60 L${100 + 40 * k} 340" stroke="${C.craie}" stroke-width="2"/>`;
    s += `<path d="M100 ${60 + 40 * k} L380 ${60 + 40 * k}" stroke="${C.craie}" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une terrasse carrée de 7 carreaux sur 7">
  <rect x="100" y="60" width="280" height="280" fill="${C.jaune}" fill-opacity=".18"/>
  ${s}
  <text x="240" y="380" fill="${C.jaune}" font-size="26" text-anchor="middle">7 carreaux</text>
  <text x="70" y="208" fill="${C.jaune}" font-size="26" text-anchor="middle" transform="rotate(-90 70 200)">7 carreaux</text>
  </svg>`;
};

// Un cube 3 × 3 × 3 en perspective : face avant 180 px, fuite (30 ; −30) par petit cube.
const rubik = () => {
  let s = "";
  for (let j = 1; j <= 2; j++) {
    s += `<path d="M${100 + 60 * j} 160 L${100 + 60 * j} 340 M100 ${160 + 60 * j} L280 ${160 + 60 * j}" stroke="${C.craie}" stroke-width="2"/>`;
    s += `<path d="M${100 + 30 * j} ${160 - 30 * j} L${280 + 30 * j} ${160 - 30 * j} M${100 + 60 * j} 160 L${190 + 60 * j} 70" stroke="${C.craie}" stroke-width="2"/>`;
    s += `<path d="M280 ${160 + 60 * j} L370 ${70 + 60 * j} M${280 + 30 * j} ${160 - 30 * j} L${280 + 30 * j} ${340 - 30 * j}" stroke="${C.craie}" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un grand cube fait de 3 petits cubes sur chaque arête">
  <path d="M100 160 L280 160 L280 340 L100 340 Z" fill="${C.rose}" fill-opacity=".2"/>
  <path d="M100 160 L190 70 L370 70 L280 160 Z" fill="${C.jaune}" fill-opacity=".25"/>
  <path d="M280 160 L370 70 L370 250 L280 340 Z" fill="${C.bleu}" fill-opacity=".2"/>
  ${s}
  <path d="M100 160 L280 160 L280 340 L100 340 Z M100 160 L190 70 L370 70 L280 160 M370 70 L370 250 L280 340" stroke="${C.craie}" stroke-width="4" fill="none" stroke-linejoin="round"/>
  <text x="240" y="390" fill="${C.pale}" font-size="22" text-anchor="middle">3 petits cubes sur chaque arête</text>
  </svg>`;
};

// Bactéries : chaque heure, chacune se coupe en deux.
const bacteries = () => {
  let s = "";
  [1, 2, 4, 8].forEach((n, h) => {
    const y = 80 + 70 * h;
    s += `<text x="40" y="${y + 8}" fill="${C.pale}" font-size="22">${h} h</text>`;
    for (let i = 0; i < n; i++) s += `<ellipse cx="${130 + 38 * i}" cy="${y}" rx="14" ry="10" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="3"/>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="1 bactérie, puis 2, puis 4, puis 8 d'heure en heure">
  ${s}
  <text x="40" y="378" fill="${C.rose}" font-size="22">5 h</text>
  <text x="240" y="378" fill="${C.rose}" font-size="30" text-anchor="middle">? bactéries</text>
  </svg>`;
};

// La face d'un cube de 1 cm, agrandie : 200 px, 10 mm par arête.
const millimetres = () => {
  let s = "";
  for (let k = 1; k < 10; k++) {
    s += `<path d="M${120 + 20 * k} 100 L${120 + 20 * k} 300 M120 ${100 + 20 * k} L320 ${100 + 20 * k}" stroke="${C.pale}" stroke-width="1"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un cube de 1 cm d'arête, agrandi, découpé en petits cubes de 1 mm">
  <path d="M120 100 L180 40 L380 40 L320 100 Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <path d="M320 100 L380 40 L380 240 L320 300 Z" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <rect x="120" y="100" width="200" height="200" fill="${C.rose}" fill-opacity=".1"/>
  ${s}
  <rect x="120" y="100" width="200" height="200" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <text x="220" y="340" fill="${C.craie}" font-size="24" text-anchor="middle">1 cm = 10 mm</text>
  <text x="240" y="390" fill="${C.pale}" font-size="20" text-anchor="middle">agrandi, pas à l'échelle</text>
  </svg>`;
};

const piege = () => {
  let s = "";
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += `<circle cx="${290 + 50 * i}" cy="${190 + 50 * j}" r="14" fill="${C.jaune}"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le calcul de Zoé : 3 au carré égale 6 ; à côté, 3 rangées de 3 points">
  <text x="140" y="120" fill="${C.craie}" font-size="54" text-anchor="middle">3<tspan font-size="32" dy="-24">2</tspan><tspan dy="24"> = 6</tspan></text>
  <text x="140" y="190" fill="${C.rose}" font-size="30" text-anchor="middle">Zoé a-t-elle</text>
  <text x="140" y="228" fill="${C.rose}" font-size="30" text-anchor="middle">raison ?</text>
  ${s}
  <text x="340" y="360" fill="${C.pale}" font-size="22" text-anchor="middle">3 rangées de 3</text>
  </svg>`;
};

// Les nombres impairs en équerres : carré de 5 × 5 cases de 50 px.
const equerres = () => {
  const couleurs = [C.rose, C.bleu, C.jaune, C.rose, C.bleu];
  let s = "";
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
    const k = Math.max(i, j);
    s += `<rect x="${115 + 50 * i}" y="${50 + 50 * j}" width="50" height="50" fill="${couleurs[k]}" fill-opacity=".3" stroke="${C.craie}" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un carré de 5 sur 5 fait d'équerres de 1, 3, 5, 7 et 9 cases">
  ${s}
  <text x="240" y="345" fill="${C.craie}" font-size="26" text-anchor="middle">1 + 3 + 5 + 7 + 9 = 25 = 5<tspan font-size="16" dy="-12">2</tspan></text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">1 + 3 + 5 + … + 19 = ?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "puissance_simple",
  titre: "Énigmes sur le carré, le cube et les puissances",
  description: "Carré, cube et puissances simples en 5e (programme 2026) : terrasse carrée, cube de Rubik, bactéries qui doublent, mm³ dans un cm³, piège du 3², somme des impairs. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Sur la terrasse",
      titre: "Le carrelage carré",
      question: `Une terrasse carrée a <b>7 carreaux</b> sur chaque côté.<br><br><b>Combien de carreaux</b> en tout ?`,
      reponse: `7 × 7 = 7<sup>2</sup> = 49.<br>Il y a <span class="big">49 carreaux</span>. « 7 au carré », c'est 7 × 7.`,
      consigne: "Combien de carreaux y a-t-il sur la terrasse ?",
      verification: { type: "courte", attendus: ["49"], unite: "carreaux" },
      dessin: terrasse(),
    },
    {
      tag: "Énigme 2 · Le casse-tête",
      titre: "Le grand cube",
      question: `Un grand cube est fait de petits cubes.<br>Il y a <b>3 petits cubes</b> sur chaque arête.<br><br><b>Combien de petits cubes</b> en tout ?`,
      reponse: `3 couches de 3 × 3 petits cubes : 3 × 3 × 3 = 3<sup>3</sup> = 27.<br>Il y a <span class="big">27 petits cubes</span>.`,
      consigne: "Combien de petits cubes forment le grand cube ?",
      verification: { type: "courte", attendus: ["27"], unite: "petits cubes" },
      dessin: rubik(),
    },
    {
      tag: "Énigme 3 · Au labo de SVT",
      titre: "Les bactéries qui doublent",
      question: `Au départ, il y a <b>1 bactérie</b>.<br>Chaque heure, chaque bactérie se coupe en <b>deux</b>.<br><br><b>Combien de bactéries</b> après 5 heures ?`,
      reponse: `2 × 2 × 2 × 2 × 2 = 2<sup>5</sup> = 32.<br>Il y a <span class="big">32 bactéries</span>. (Pas 2 × 5 = 10 !)`,
      consigne: "Combien de bactéries après 5 heures ?",
      verification: { type: "qcm", choix: ["10", "25", "32"], bonne: 2 },
      dessin: bacteries(),
    },
    {
      tag: "Énigme 4 · À la loupe",
      titre: "Les petits cubes de 1 mm",
      question: `Un cube a <b>1 cm</b> d'arête, soit <b>10 mm</b>.<br>On le découpe en petits cubes de <b>1 mm</b> d'arête.<br><br><b>Combien de petits cubes</b> obtient-on ?`,
      reponse: `10 × 10 × 10 = 10<sup>3</sup> = 1 000.<br>On obtient <span class="big">1 000 petits cubes</span> : 1 cm<sup>3</sup> = 1 000 mm<sup>3</sup>.`,
      consigne: "Combien de cubes de 1 mm d'arête dans un cube de 1 cm d'arête ?",
      verification: { type: "courte", attendus: ["1000", "1 000"], unite: "petits cubes" },
      dessin: millimetres(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré de Zoé",
      sorte: "piege",
      question: `Zoé écrit : <b>3<sup>2</sup> = 6</b>.<br><br><b>A-t-elle raison ?</b> Sinon, combien vaut 3<sup>2</sup> ?`,
      reponse: `Non ! 3<sup>2</sup>, ce n'est pas 3 × 2.<br>3<sup>2</sup> = 3 × 3 = <span class="big">9</span>.`,
      consigne: "Combien vaut 3 au carré ?",
      verification: { type: "qcm", choix: ["9", "6", "5"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les équerres des impairs",
      sorte: "defi",
      question: `1 + 3 = 4 = 2<sup>2</sup>. 1 + 3 + 5 = 9 = 3<sup>2</sup>.<br>Le dessin montre pourquoi.<br><br><b>Combien vaut 1 + 3 + 5 + … + 19 ?</b>`,
      reponse: `De 1 à 19, il y a 10 nombres impairs : 10 équerres.<br>Elles font un carré de 10 sur 10 : 10<sup>2</sup> = <span class="big">100</span>.`,
      consigne: "Combien vaut la somme des nombres impairs de 1 à 19 ?",
      verification: { type: "courte", attendus: ["100"] },
      dessin: equerres(),
    },
  ],
};

export default problemes;
