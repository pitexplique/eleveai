// Énigmes à projeter — 4e, notion grandeur_composee (vitesse moyenne d'un
// bateau en 1 h 15 min, énergie d'un radiateur en kWh, guépard en km/h et m/s,
// fresque en m² et cm², piège de la vitesse moyenne aller-retour, défi de
// l'avion en 7 h 20 min). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";

// Une petite horloge (décor) centrée en (x, y).
const horloge = (x: number, y: number, r = 34) =>
  `<circle cx="${x}" cy="${y}" r="${r}" ${S}/>` +
  `<path d="M${x} ${y} L${x} ${y - r * 0.65} M${x} ${y} L${x + r * 0.5} ${y}" stroke="${C.craie}" stroke-width="4" stroke-linecap="round"/>`;

// Le bateau : deux ports, 45 km, 1 h 15 min.
const bateau = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un bateau relie deux ports distants de 45 km en 1 heure 15 minutes">
  <path d="M30 250 Q90 235 150 250 T270 250 T390 250 T450 250" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <path d="M30 290 Q90 275 150 290 T270 290 T390 290 T450 290" stroke="${C.bleu}" stroke-width="3" fill="none" stroke-opacity=".6"/>
  <rect x="30" y="190" width="40" height="40" rx="6" fill="${C.jaune}" fill-opacity=".35" stroke="${C.jaune}" stroke-width="3"/>
  <rect x="410" y="190" width="40" height="40" rx="6" fill="${C.jaune}" fill-opacity=".35" stroke="${C.jaune}" stroke-width="3"/>
  <text x="200" y="235" font-size="48" text-anchor="middle">⛴️</text>
  <path d="M50 150 L430 150" ${S}/>
  <path d="M50 138 L50 162 M430 138 L430 162" ${S}/>
  <text x="240" y="130" fill="${C.craie}" font-size="26" text-anchor="middle">45 km</text>
  ${horloge(170, 355)}
  <text x="300" y="365" fill="${C.rose}" font-size="26" text-anchor="middle">1 h 15 min</text>
  <text x="240" y="60" fill="${C.pale}" font-size="22" text-anchor="middle">vitesse moyenne${NB}? km/h</text>
  </svg>`;

// Le radiateur : 1,5 kW pendant 4 h.
const radiateur = () => {
  let ailettes = "";
  for (let k = 0; k < 7; k++) ailettes += `<rect x="${92 + 34 * k}" y="110" width="22" height="160" rx="8" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un radiateur de 1,5 kilowatt allumé pendant 4 heures">
  <text x="240" y="70" fill="${C.craie}" font-size="26" text-anchor="middle">🏔️ le chalet</text>
  ${ailettes}
  <path d="M80 270 L330 270" ${S}/>
  <text x="400" y="170" fill="${C.rose}" font-size="28" text-anchor="middle">1,5 kW</text>
  <text x="400" y="205" fill="${C.pale}" font-size="20" text-anchor="middle">puissance</text>
  ${horloge(170, 345)}
  <text x="280" y="355" fill="${C.bleu}" font-size="28" text-anchor="middle">4 h</text>
  <text x="240" y="405" fill="${C.pale}" font-size="20" text-anchor="middle">énergie consommée${NB}?</text>
  </svg>`;
};

// Le guépard : 108 km/h, combien de m/s ?
const guepard = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un guépard qui court à 108 kilomètres par heure">
  <text x="240" y="120" font-size="70" text-anchor="middle">🐆</text>
  <path d="M60 160 L420 160" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 10"/>
  <text x="240" y="220" fill="${C.jaune}" font-size="36" text-anchor="middle">108 km/h</text>
  <text x="240" y="275" fill="${C.craie}" font-size="22" text-anchor="middle">1 km = 1 000 m</text>
  <text x="240" y="315" fill="${C.craie}" font-size="22" text-anchor="middle">1 h = 3 600 s</text>
  <text x="240" y="380" fill="${C.rose}" font-size="30" text-anchor="middle">= ? m/s</text>
  </svg>`;

// La fresque : un mur de 3 m² en carrés de 10 cm de côté (décor, pas à l'échelle).
const fresque = () => {
  const coul = [C.rose, C.jaune, C.bleu];
  let g = "";
  for (let j = 0; j < 5; j++)
    for (let i = 0; i < 9; i++)
      if ((i + 2 * j) % 4 !== 3)
        g += `<rect x="${60 + 40 * i}" y="${90 + 40 * j}" width="36" height="36" fill="${coul[(i + j) % 3]}" fill-opacity=".4" stroke="${C.craie}" stroke-width="1.5"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une fresque de 3 mètres carrés faite de petits carrés de 10 centimètres de côté">
  <text x="240" y="60" fill="${C.craie}" font-size="26" text-anchor="middle">🎨 la fresque${NB}: 3 m²</text>
  <rect x="50" y="80" width="380" height="210" rx="6" ${S}/>
  ${g}
  <path d="M60 310 L96 310" stroke="${C.rose}" stroke-width="4" stroke-linecap="round"/>
  <text x="140" y="318" fill="${C.rose}" font-size="22" text-anchor="middle">10 cm</text>
  <text x="240" y="365" fill="${C.pale}" font-size="20" text-anchor="middle">combien de petits carrés${NB}?</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  </svg>`;
};

// La randonnée : montée 6 km à 3 km/h, descente 6 km à 6 km/h.
const refuge = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un sentier de 6 km monte à un refuge, puis redescend : 3 km/h à la montée, 6 km/h à la descente">
  <path d="M40 360 L240 110 L440 360" ${S}/>
  <text x="240" y="95" font-size="38" text-anchor="middle">🛖</text>
  <text x="100" y="230" fill="${C.craie}" font-size="22" text-anchor="middle">6 km</text>
  <text x="380" y="230" fill="${C.craie}" font-size="22" text-anchor="middle">6 km</text>
  <text x="110" y="330" fill="${C.bleu}" font-size="24" text-anchor="middle">↗ 3 km/h</text>
  <text x="370" y="330" fill="${C.rose}" font-size="24" text-anchor="middle">6 km/h ↘</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">Inès${NB}: «${NB}en moyenne, 4,5 km/h${NB}»</text>
  </svg>`;

// L'avion : 5 500 km en 7 h 20 min.
const avion = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un avion parcourt 5 500 kilomètres en 7 heures 20 minutes">
  <path d="M50 300 Q240 80 430 300" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 10" fill="none"/>
  <circle cx="50" cy="300" r="9" fill="${C.jaune}"/>
  <circle cx="430" cy="300" r="9" fill="${C.jaune}"/>
  <text x="240" y="180" font-size="50" text-anchor="middle">✈️</text>
  <text x="240" y="250" fill="${C.craie}" font-size="28" text-anchor="middle">5 500 km</text>
  ${horloge(160, 360, 30)}
  <text x="290" y="370" fill="${C.rose}" font-size="28" text-anchor="middle">7 h 20 min</text>
  <text x="240" y="60" fill="${C.pale}" font-size="22" text-anchor="middle">vitesse moyenne${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "grandeur_composee",
  titre: "Énigmes sur les vitesses et grandeurs composées",
  description: "Le bateau entre deux ports, le radiateur du chalet, la course du guépard, la fresque en petits carrés, le piège de la randonnée, le défi de l'avion : vitesse moyenne, kWh, km/h et m/s, m² et cm².",
  problemes: [
    {
      tag: "Énigme 1 · Le bateau",
      titre: "La traversée",
      question: `Un bateau relie deux ports distants de 45 km.<br>La traversée dure 1 h 15 min.<br><br>Quelle est sa vitesse moyenne, en km/h ?`,
      reponse: `On convertit la durée en heures : 15 min = un quart d'heure = 0,25 h.<br>Donc 1 h 15 min = 1,25 h.<br>Vitesse = distance ÷ durée = 45 ÷ 1,25 = 36.<br>Sa vitesse moyenne est <span class="big">36 km/h</span>.<br>Contrôle : 36 × 1,25 = 36 + 9 = 45 km.`,
      consigne: "Quelle est la vitesse moyenne du bateau, en km/h ?",
      verification: { type: "courte", attendus: ["36"], unite: "km/h" },
      dessin: bateau(),
    },
    {
      tag: "Énigme 2 · Au chalet",
      titre: "Le radiateur",
      question: `Dans un chalet, Théo allume un radiateur de 1,5 kW.<br>Il reste allumé pendant 4 h.<br><br>Quelle énergie a-t-il consommée ?`,
      reponse: `L'énergie est une grandeur <b>produit</b> : puissance × durée.<br>1,5 kW × 4 h = 6 kWh.<br>L'unité raconte le calcul : kilowatt <b>fois</b> heure.<br>Le radiateur a consommé <span class="big">6 kWh</span>.`,
      consigne: "Quelle énergie le radiateur a-t-il consommée ?",
      verification: { type: "qcm", choix: ["6 kWh", "5,5 kW", "0,375 kW/h"], bonne: 0 },
      dessin: radiateur(),
    },
    {
      tag: "Énigme 3 · Dans la savane",
      titre: "La course du guépard",
      question: `Un guépard court à 108 km/h.<br>Aïcha veut cette vitesse en <b>m/s</b>.<br><br>Combien de mètres parcourt-il en une seconde ?`,
      reponse: `108 km/h veut dire : 108 km <b>pour</b> 1 h.<br>108 km = 108 000 m et 1 h = 3 600 s.<br>108 000 ÷ 3 600 = 30.<br>Le guépard court à <span class="big">30 m/s</span>.<br>Contrôle : 30 m × 3 600 = 108 000 m = 108 km.`,
      consigne: "Quelle est la vitesse du guépard, en m/s ?",
      verification: { type: "courte", attendus: ["30"], unite: "m/s" },
      dessin: guepard(),
    },
    {
      tag: "Énigme 4 · La fresque",
      titre: "Des petits carrés",
      question: `Une classe peint une fresque de 3 m² sur un mur.<br>Elle est faite de petits carrés de 10 cm de côté.<br><br>Combien de petits carrés faut-il ?`,
      reponse: `1 m = 100 cm, donc 1 m² = 100 cm × 100 cm = 10 000 cm².<br>Le facteur 100 s'applique deux fois.<br>3 m² = 30 000 cm².<br>Un petit carré : 10 cm × 10 cm = 100 cm².<br>30 000 ÷ 100 = 300. Il faut <span class="big">300 petits carrés</span>.`,
      consigne: "Combien de petits carrés faut-il pour la fresque ?",
      verification: { type: "courte", attendus: ["300"], unite: "carrés" },
      dessin: fresque(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La montée au refuge",
      sorte: "piege",
      question: `Inès monte à un refuge : 6 km à 3 km/h.<br>Elle redescend le même sentier à 6 km/h.<br>Elle dit : « En moyenne, j'ai marché à 4,5 km/h. »<br><br><b>Quelle est sa vraie vitesse moyenne ?</b>`,
      reponse: `Non ! On ne fait pas la moyenne des deux vitesses.<br>Montée : 6 ÷ 3 = 2 h. Descente : 6 ÷ 6 = 1 h.<br>En tout : 12 km en 3 h.<br>Vitesse moyenne = 12 ÷ 3 = <span class="big">4 km/h</span>.<br>Elle a marché plus longtemps à 3 km/h : cette vitesse compte plus.`,
      consigne: "Quelle est la vitesse moyenne d'Inès sur l'aller-retour ?",
      verification: { type: "qcm", choix: ["4,5 km/h", "4 km/h", "9 km/h"], bonne: 1 },
      dessin: refuge(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le vol de 7 h 20",
      sorte: "defi",
      question: `Hugo prend l'avion pour un vol de 5 500 km.<br>Le vol dure 7 h 20 min.<br><br>Quelle est la vitesse moyenne de l'avion, en km/h ?<br>Attention : 20 min, ce n'est pas 0,2 h !`,
      reponse: `20 min = un tiers d'heure.<br>Donc 7 h 20 min = 7 h + ${frac(1, 3)} h = ${frac(22, 3)} h : 22 tiers d'heure.<br>En un tiers d'heure : 5 500 ÷ 22 = 250 km.<br>En une heure : 250 × 3 = 750 km.<br>Vitesse moyenne : <span class="big">750 km/h</span>.<br>Contrôle : 750 × 7 = 5 250, plus 250 pour les 20 min : 5 500 km.`,
      consigne: "Quelle est la vitesse moyenne de l'avion, en km/h ?",
      verification: { type: "courte", attendus: ["750"], unite: "km/h" },
      dessin: avion(),
    },
  ],
};

export default problemes;
