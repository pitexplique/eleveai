// Énigmes à projeter — 5e, notion fraction_calcul (fraction d'une quantité,
// additionner et soustraire quand un dénominateur est multiple de l'autre). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

// 40 élèves en 5 groupes de 8 ; 3 groupes colorés.
const eleves = () => {
  let s = "";
  for (let g = 0; g < 5; g++) {
    s += `<rect x="${32 + 86 * g}" y="90" width="76" height="160" rx="8" fill="${g < 3 ? C.bleu : "none"}" fill-opacity=".15" stroke="${g < 3 ? C.bleu : C.pale}" stroke-width="3"/>`;
    for (let i = 0; i < 8; i++) s += `<circle cx="${52 + 86 * g + 36 * (i % 2)}" cy="${115 + 36 * Math.floor(i / 2)}" r="11" fill="${g < 3 ? C.bleu : C.pale}"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="40 élèves en 5 groupes de 8 ; 3 groupes sont colorés">
  <text x="240" y="60" fill="${C.craie}" font-size="24" text-anchor="middle">40 élèves</text>
  ${s}
  <text x="240" y="320" fill="${C.bleu}" font-size="26" text-anchor="middle">3 groupes sur 5 vont à la cantine</text>
  <text x="240" y="370" fill="${C.rose}" font-size="28" text-anchor="middle">? élèves</text>
  </svg>`;
};

// Un potager coupé en 6 bandes : 4 tomates, 1 salade, 1 vide.
const potager = () => {
  let s = "";
  for (let i = 0; i < 6; i++) {
    const c = i < 4 ? C.rose : i < 5 ? C.bleu : "none";
    s += `<rect x="${60 + 60 * i}" y="90" width="60" height="200" fill="${c}" fill-opacity=".3" stroke="${C.craie}" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un potager en 6 bandes : 4 de tomates, 1 de salades, 1 vide">
  ${s}
  <rect x="60" y="90" width="360" height="200" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <text x="180" y="70" fill="${C.rose}" font-size="22" text-anchor="middle">tomates</text>
  <text x="330" y="70" fill="${C.bleu}" font-size="22" text-anchor="middle">salades</text>
  <path d="M330 75 L330 88" stroke="${C.bleu}" stroke-width="2"/>
  ${svgFrac(180, 340, 2, 3, C.rose, 28)}
  <text x="240" y="352" fill="${C.craie}" font-size="30" text-anchor="middle">+</text>
  ${svgFrac(300, 340, 1, 6, C.bleu, 28)}
  </svg>`;
};

// Un gâteau en 9 parts : 2 roses (midi), 4 bleues (goûter), 3 restent.
const gateau = () => {
  let s = "";
  const cx = 240, cy = 200, r = 130;
  for (let i = 0; i < 9; i++) {
    const a0 = -Math.PI / 2 + (2 * Math.PI * i) / 9, a1 = -Math.PI / 2 + (2 * Math.PI * (i + 1)) / 9;
    const p = (a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    const c = i < 2 ? C.rose : i < 6 ? C.bleu : "none";
    s += `<path d="M${cx} ${cy} L${p(a0)} A${r} ${r} 0 0 1 ${p(a1)} Z" fill="${c}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un gâteau en 9 parts : 2 mangées à midi, 4 au goûter, 3 restent">
  ${s}
  <text x="40" y="380" fill="${C.rose}" font-size="22">midi</text>
  <text x="150" y="380" fill="${C.bleu}" font-size="22">goûter</text>
  <text x="440" y="380" fill="${C.craie}" font-size="22" text-anchor="end">reste : ?</text>
  </svg>`;
};

// Une horloge : les trois quarts d'heure colorés.
const horloge = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une horloge : trois quarts d'heure sont colorés">
  <path d="M240 210 L240 80 A130 130 0 1 1 110 210 Z" fill="${C.jaune}" fill-opacity=".35"/>
  <circle cx="240" cy="210" r="130" fill="none" stroke="${C.craie}" stroke-width="5"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => { const a = (Math.PI / 6) * h; return `<path d="M${(240 + 115 * Math.sin(a)).toFixed(1)} ${(210 - 115 * Math.cos(a)).toFixed(1)} L${(240 + 128 * Math.sin(a)).toFixed(1)} ${(210 - 128 * Math.cos(a)).toFixed(1)}" stroke="${C.craie}" stroke-width="3"/>`; }).join("")}
  <path d="M240 210 L240 100" stroke="${C.craie}" stroke-width="5" stroke-linecap="round"/>
  ${svgFrac(400, 370, 3, 4, C.jaune, 28)}
  <text x="60" y="390" fill="${C.rose}" font-size="26">= ? min</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le calcul de Tom : un demi plus un quart égale deux sixièmes">
  ${svgFrac(110, 130, 1, 2, C.craie, 40)}
  <text x="165" y="145" fill="${C.craie}" font-size="40" text-anchor="middle">+</text>
  ${svgFrac(220, 130, 1, 4, C.craie, 40)}
  <text x="280" y="145" fill="${C.craie}" font-size="40" text-anchor="middle">=</text>
  ${svgFrac(340, 130, 2, 6, C.rose, 40)}
  <text x="240" y="250" fill="${C.rose}" font-size="32" text-anchor="middle">Tom a-t-il raison ?</text>
  <rect x="60" y="300" width="180" height="40" fill="${C.bleu}" fill-opacity=".35"/>
  <rect x="240" y="300" width="90" height="40" fill="${C.jaune}" fill-opacity=".45"/>
  <rect x="60" y="300" width="360" height="40" fill="none" stroke="${C.craie}" stroke-width="3"/>
  </svg>`;

// Un réservoir rempli aux deux tiers.
const reservoir = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un réservoir rempli aux deux tiers, qui contient 30 litres">
  <rect x="150" y="130" width="180" height="140" fill="${C.bleu}" fill-opacity=".3"/>
  <rect x="150" y="60" width="180" height="210" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <path d="M150 130 L330 130 M150 200 L330 200" stroke="${C.craie}" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="240" y="245" fill="${C.bleu}" font-size="30" text-anchor="middle">30 L</text>
  <text x="400" y="140" fill="${C.bleu}" font-size="22" text-anchor="middle">rempli aux</text>
  ${svgFrac(400, 180, 2, 3, C.bleu, 26)}
  <text x="240" y="340" fill="${C.rose}" font-size="28" text-anchor="middle">plein : ? L</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "fraction_calcul",
  titre: "Énigmes sur le calcul avec les fractions",
  description: "Calculer avec les fractions en 5e : fraction d'un groupe d'élèves, potager partagé, gâteau entamé, trois quarts d'heure, piège de Tom, réservoir aux deux tiers. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · À la cantine",
      titre: "Les trois cinquièmes",
      question: `Une classe compte <b>40 élèves</b>.<br>Les ${frac(3, 5)} des élèves mangent à la cantine.<br><br><b>Combien d'élèves</b> mangent à la cantine ?`,
      reponse: `${frac(1, 5)} de 40, c'est 40 ÷ 5 = 8. Donc ${frac(3, 5)} de 40, c'est 3 × 8 = 24.<br><span class="big">24 élèves</span> mangent à la cantine.`,
      consigne: "Combien d'élèves mangent à la cantine ?",
      verification: { type: "courte", attendus: ["24"], unite: "élèves" },
      dessin: eleves(),
    },
    {
      tag: "Énigme 2 · Au potager",
      titre: "Tomates et salades",
      question: `Dans un potager, les tomates prennent ${frac(2, 3)} de la place et les salades ${frac(1, 6)}.<br><br><b>Quelle fraction</b> du potager est plantée ?`,
      reponse: `${frac(2, 3)} = ${frac(4, 6)}. Puis ${frac(4, 6)} + ${frac(1, 6)} = ${frac(5, 6)}.<br>Le potager est planté aux <span class="big">${frac(5, 6)}</span>.`,
      consigne: "Quelle fraction du potager est plantée ? (écris-la comme a/b)",
      verification: { type: "courte", attendus: ["5/6"] },
      dessin: potager(),
    },
    {
      tag: "Énigme 3 · Le gâteau",
      titre: "Ce qu'il reste",
      question: `Un gâteau est coupé en <b>9 parts</b> égales.<br>On en mange ${frac(2, 9)} à midi et ${frac(4, 9)} au goûter.<br><br><b>Quelle fraction</b> du gâteau reste-t-il ?`,
      reponse: `On a mangé ${frac(2, 9)} + ${frac(4, 9)} = ${frac(6, 9)}. Il reste ${frac(9, 9)} − ${frac(6, 9)} = ${frac(3, 9)}.<br>Il reste <span class="big">${frac(3, 9)} = ${frac(1, 3)}</span> du gâteau.`,
      consigne: "Quelle fraction du gâteau reste-t-il ? (écris-la comme a/b)",
      verification: { type: "courte", attendus: ["1/3", "3/9"] },
      dessin: gateau(),
    },
    {
      tag: "Énigme 4 · L'entraînement",
      titre: "Trois quarts d'heure",
      question: `L'entraînement de foot dure ${frac(3, 4)} d'heure.<br><br><b>Combien de minutes</b> dure-t-il ?`,
      reponse: `${frac(1, 4)} d'heure = 60 ÷ 4 = 15 min. Donc ${frac(3, 4)} d'heure = 3 × 15 = <span class="big">45 min</span>.`,
      consigne: "Combien de minutes dure l'entraînement ?",
      verification: { type: "qcm", choix: ["34 min", "45 min", "75 min"], bonne: 1 },
      dessin: horloge(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Tom",
      sorte: "piege",
      question: `Tom écrit : ${frac(1, 2)} + ${frac(1, 4)} = ${frac(2, 6)}.<br><br><b>A-t-il raison ?</b> Sinon, quel est le bon résultat ?`,
      reponse: `Non ! On n'additionne pas les dénominateurs. ${frac(2, 6)} est même plus petit que ${frac(1, 2)} !<br>${frac(1, 2)} = ${frac(2, 4)}, donc ${frac(2, 4)} + ${frac(1, 4)} = <span class="big">${frac(3, 4)}</span>.`,
      consigne: "Combien vaut 1/2 + 1/4 ?",
      verification: { type: "qcm", choix: ["3/4", "2/6", "1/3"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le réservoir aux deux tiers",
      sorte: "defi",
      question: `Un réservoir d'eau est rempli aux ${frac(2, 3)}.<br>Il contient <b>30 L</b>.<br><br><b>Combien de litres</b> contient-il quand il est plein ?`,
      reponse: `${frac(2, 3)} = 30 L, donc ${frac(1, 3)} = 15 L.<br>Plein, c'est ${frac(3, 3)} : 3 × 15 = <span class="big">45 L</span>.`,
      consigne: "Combien de litres contient le réservoir plein ?",
      verification: { type: "courte", attendus: ["45"], unite: "L" },
      dessin: reservoir(),
    },
  ],
};

export default problemes;
