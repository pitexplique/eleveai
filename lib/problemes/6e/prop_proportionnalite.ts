// Énigmes à projeter — 6e, notion prop_proportionnalite (tableau, passage par
// l'unité, coefficient, résoudre en additionnant, reconnaître : le piège de
// la taille, l'escargot). 20/11/2026. Phrases courtes (les 6e lisent difficilement).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

/** Un tableau de 2 lignes : en-têtes à gauche (largeur h), colonnes de largeur w. */
const tableau = (
  x0: number, y0: number, h: number, w: number,
  entetes: [string, string], ligne1: string[], ligne2: string[],
  couleurs: [string, string]
) => {
  const H = 60;
  let s = "";
  [ligne1, ligne2].forEach((ligne, r) => {
    const y = y0 + r * H;
    s += `<rect x="${x0}" y="${y}" width="${h}" height="${H}" fill="${couleurs[r]}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>`;
    s += `<text x="${x0 + h / 2}" y="${y + 38}" fill="${couleurs[r]}" font-size="22" text-anchor="middle">${entetes[r]}</text>`;
    ligne.forEach((v, c) => {
      const x = x0 + h + c * w;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${H}" fill="none" stroke="${C.craie}" stroke-width="3"/>`;
      s += `<text x="${x + w / 2}" y="${y + 40}" fill="${v === "?" ? C.rose : C.craie}" font-size="28" text-anchor="middle">${v}</text>`;
    });
  });
  return s;
};

// Peinture verte : 2 pots de jaune pour 3 pots de bleu.
const peinture = () => {
  let pots = "";
  [0, 1].forEach((i) => (pots += `<rect x="${95 + i * 50}" y="60" width="36" height="44" rx="5" fill="${C.jaune}" fill-opacity=".45" stroke="${C.jaune}" stroke-width="3"/>`));
  [0, 1, 2].forEach((i) => (pots += `<rect x="${255 + i * 50}" y="60" width="36" height="44" rx="5" fill="${C.bleu}" fill-opacity=".45" stroke="${C.bleu}" stroke-width="3"/>`));
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau : 2, 4, 6, 10 pots de jaune ; 3, 6 pots de bleu, puis deux cases inconnues">
  ${pots}
  <text x="218" y="92" fill="${C.craie}" font-size="30" text-anchor="middle">+</text>
  <text x="240" y="145" fill="${C.pale}" font-size="22" text-anchor="middle">pour faire du vert</text>
  ${tableau(30, 180, 120, 75, ["jaune", "bleu"], ["2", "4", "6", "10"], ["3", "6", "?", "?"], [C.jaune, C.bleu])}
  <text x="240" y="370" fill="${C.pale}" font-size="22" text-anchor="middle">en nombre de pots</text>
  </svg>`;
};

// 6 bouteilles identiques = 9 L ; 4 bouteilles = ? L.
const bouteilles = () => {
  const b = (x: number, y: number) =>
    `<rect x="${x + 12}" y="${y}" width="16" height="16" rx="3" fill="${C.bleu}"/>` +
    `<rect x="${x}" y="${y + 16}" width="40" height="84" rx="10" fill="${C.bleu}" fill-opacity=".25" stroke="${C.bleu}" stroke-width="3"/>`;
  let s = "";
  for (let i = 0; i < 6; i++) s += b(30 + i * 55, 70);
  for (let i = 0; i < 4; i++) s += b(30 + i * 55, 240);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="6 bouteilles identiques contiennent 9 litres ; 4 bouteilles contiennent combien ?">
  ${s}
  <text x="415" y="135" fill="${C.craie}" font-size="32" text-anchor="middle">9 L</text>
  <text x="330" y="305" fill="${C.rose}" font-size="32" text-anchor="middle">? L</text>
  <text x="240" y="390" fill="${C.pale}" font-size="22" text-anchor="middle">toutes les bouteilles sont pareilles</text>
  </svg>`;
};

// La pâte à gâteau : œufs 2, 3, 5 ; farine 100, 150, 250 g.
const gateau = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau : 2, 3, 5 œufs pour 100, 150, 250 grammes de farine">
  <text x="240" y="100" font-size="44" text-anchor="middle">🥚 🎂</text>
  ${tableau(40, 150, 140, 80, ["œufs", "farine (g)"], ["2", "3", "5"], ["100", "150", "250"], [C.jaune, C.bleu])}
  <text x="240" y="340" fill="${C.rose}" font-size="28" text-anchor="middle">œufs → farine : × ?</text>
  </svg>`;

// Les ballons : 6 ballons en 4 min ; 9 ballons en ? min.
const ballons = () => {
  const coul = [C.rose, C.bleu, C.jaune];
  const ballon = (x: number, y: number, k: number) =>
    `<path d="M${x} ${y + 18} q 5 18 0 34" stroke="${C.pale}" stroke-width="2" fill="none"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="16" ry="19" fill="${coul[k % 3]}" fill-opacity=".45" stroke="${coul[k % 3]}" stroke-width="3"/>`;
  let s = "";
  for (let i = 0; i < 6; i++) s += ballon(50 + i * 40, 110, i);
  for (let i = 0; i < 9; i++) s += ballon(50 + i * 40, 270, i);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="6 ballons gonflés en 4 minutes ; 9 ballons en combien de minutes ?">
  ${s}
  <text x="400" y="122" fill="${C.craie}" font-size="30" text-anchor="middle">4 min</text>
  <text x="430" y="282" fill="${C.rose}" font-size="30" text-anchor="middle">? min</text>
  <text x="240" y="390" fill="${C.pale}" font-size="22" text-anchor="middle">toujours le même rythme</text>
  </svg>`;
};

// Le piège : Hugo 1,40 m à 10 ans ; le « Hugo de 2,80 m » ; une porte de 2 m.
// Échelle : 1 m = 100 px, le sol en y = 380.
const croissance = () => {
  const bonhomme = (x: number, h: number, couleur: string, pointille: boolean) => {
    const top = 380 - h, rTete = h * 0.09;
    const d = pointille ? ` stroke-dasharray="8 6"` : "";
    return `<circle cx="${x}" cy="${top + rTete}" r="${rTete}" fill="${couleur}" fill-opacity=".2" stroke="${couleur}" stroke-width="3"${d}/>` +
      `<rect x="${x - h * 0.11}" y="${top + 2 * rTete}" width="${h * 0.22}" height="${h - 2 * rTete}" rx="8" fill="${couleur}" fill-opacity=".2" stroke="${couleur}" stroke-width="3"${d}/>`;
  };
  let r = "";
  for (let m = 0; m <= 3; m++) {
    const y = 380 - 100 * m;
    r += `<path d="M58 ${y} L72 ${y}" stroke="${C.pale}" stroke-width="3"/>`;
    r += `<text x="52" y="${y + 7}" fill="${C.pale}" font-size="20" text-anchor="end">${m} m</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Hugo à 10 ans mesure 1,40 m ; à côté, une porte de 2 m et un Hugo imaginaire de 2,80 m">
  <path d="M65 80 L65 380" stroke="${C.pale}" stroke-width="3"/>
  ${r}
  <path d="M65 380 L460 380" stroke="${C.craie}" stroke-width="3"/>
  ${bonhomme(150, 140, C.bleu, false)}
  <text x="150" y="228" fill="${C.bleu}" font-size="22" text-anchor="middle">1,40 m</text>
  <rect x="225" y="180" width="70" height="200" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="3"/>
  <text x="260" y="215" fill="${C.jaune}" font-size="20" text-anchor="middle">porte</text>
  <text x="260" y="242" fill="${C.jaune}" font-size="20" text-anchor="middle">2 m</text>
  ${bonhomme(380, 280, C.rose, true)}
  <text x="380" y="88" fill="${C.rose}" font-size="22" text-anchor="middle">2,80 m ?</text>
  <text x="150" y="408" fill="${C.bleu}" font-size="20" text-anchor="middle">10 ans</text>
  <text x="380" y="408" fill="${C.rose}" font-size="20" text-anchor="middle">20 ans</text>
  </svg>`;
};

// Le défi : l'escargot. 1 m = 36 px, 0 m en x = 50. Il est à 3 m au bout de 4 h.
const escargot = () => {
  let g = "";
  for (let m = 0; m <= 10; m++) {
    const x = 50 + 36 * m;
    g += `<path d="M${x} 250 L${x} ${m % 5 === 0 ? 272 : 264}" stroke="${C.craie}" stroke-width="2"/>`;
    g += `<text x="${x}" y="298" fill="${C.pale}" font-size="20" text-anchor="middle">${m}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un escargot a avancé de 3 mètres en 4 heures sur une règle graduée en mètres">
  <path d="M50 250 L410 250" stroke="${C.craie}" stroke-width="4"/>
  ${g}
  <text x="440" y="298" fill="${C.pale}" font-size="20" text-anchor="middle">m</text>
  <text x="158" y="238" font-size="40" text-anchor="middle">🐌</text>
  <path d="M158 170 L158 196" stroke="${C.jaune}" stroke-width="3"/>
  <text x="158" y="160" fill="${C.jaune}" font-size="24" text-anchor="middle">après 4 h</text>
  <text x="240" y="370" fill="${C.rose}" font-size="28" text-anchor="middle">après 10 h → ? m</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "prop_proportionnalite",
  titre: "Énigmes sur la proportionnalité",
  description: "La peinture verte, les bouteilles du pique-nique, la pâte à gâteau, les ballons, le piège de la taille, l'escargot.",
  problemes: [
    {
      tag: "Énigme 1 · En peinture",
      titre: "Le vert parfait",
      question: `Pour faire du vert, Maya mélange <b>2 pots de jaune</b> et <b>3 pots de bleu</b>.<br>Elle garde toujours le même mélange.<br><br>Avec <b>10 pots de jaune</b>, combien de pots de bleu ?`,
      reponse: `De 2 à 10, on multiplie par 5 (2 × 5 = 10).<br>On fait pareil pour le bleu : 3 × 5 = 15.<br>Il faut <span class="big">15 pots de bleu</span>.<br>Et pour 6 pots de jaune : 3 × 3 = 9 pots de bleu.`,
      consigne: "Avec 10 pots de jaune, combien faut-il de pots de bleu ?",
      verification: { type: "courte", attendus: ["15"], unite: "pots" },
      dessin: peinture(),
    },
    {
      tag: "Énigme 2 · Au pique-nique",
      titre: "Les bouteilles d'eau",
      question: `<b>6 bouteilles</b> identiques contiennent <b>9 L</b> d'eau en tout.<br><br>Combien de litres dans <b>4 bouteilles</b> ?`,
      reponse: `D'abord, une seule bouteille : 9 ÷ 6 = 1,5 L.<br>Puis 4 bouteilles : 4 × 1,5 = 6.<br>Il y a <span class="big">6 L</span> dans 4 bouteilles.`,
      consigne: "Combien de litres d'eau dans 4 bouteilles ?",
      verification: { type: "courte", attendus: ["6"], unite: "L" },
      dessin: bouteilles(),
    },
    {
      tag: "Énigme 3 · En pâtisserie",
      titre: "La pâte à gâteau",
      question: `Pour son gâteau, Rayan suit ce tableau.<br>Il y a des œufs et de la farine.<br><br><b>Par quel nombre</b> multiplie-t-on les œufs pour trouver la farine ?`,
      reponse: `2 × 50 = 100. 3 × 50 = 150. 5 × 50 = 250.<br>C'est toujours <span class="big">× 50</span> : le coefficient de proportionnalité.<br>« + 98 » marche pour 2, mais pas pour 3 : 3 + 98 = 101.<br>Pour 6 œufs : 6 × 50 = 300 g de farine.`,
      consigne: "Par quel nombre multiplie-t-on les œufs pour trouver la farine ?",
      verification: { type: "qcm", choix: ["× 50", "× 2", "+ 98"], bonne: 0 },
      dessin: gateau(),
    },
    {
      tag: "Énigme 4 · À l'anniversaire",
      titre: "Les ballons",
      question: `Malik gonfle <b>6 ballons</b> en <b>4 minutes</b>.<br>Il garde toujours le même rythme.<br><br>Combien de minutes pour <b>9 ballons</b> ?`,
      reponse: `9 ballons, c'est 6 ballons + 3 ballons.<br>3 ballons, c'est la moitié de 6 : 4 ÷ 2 = 2 minutes.<br>4 + 2 = 6. Il lui faut <span class="big">6 minutes</span>.`,
      consigne: "Combien de minutes pour gonfler 9 ballons ?",
      verification: { type: "courte", attendus: ["6"], unite: "min" },
      dessin: ballons(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Hugo va-t-il devenir géant ?",
      sorte: "piege",
      question: `À 10 ans, Hugo mesure <b>1,40 m</b>.<br>Lou dit : « À 20 ans, il aura 2 fois son âge. Il mesurera 2 fois plus : 2,80 m. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! La taille n'est <b>pas</b> proportionnelle à l'âge.<br>On grandit vite quand on est petit. Puis on arrête de grandir, vers 18 ans.<br>2,80 m, c'est plus haut qu'une porte !<br><span class="big">Lou se trompe.</span>`,
      consigne: "Hugo mesure 1,40 m à 10 ans. Mesurera-t-il 2,80 m à 20 ans ?",
      verification: { type: "qcm", choix: ["Oui : 2 × 1,40 m = 2,80 m", "Oui, mais seulement s'il fait du sport", "Non : l'âge et la taille ne sont pas proportionnels"], bonne: 2 },
      dessin: croissance(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'escargot",
      sorte: "defi",
      question: `Un escargot avance toujours à la même vitesse.<br>En <b>4 heures</b>, il fait <b>3 m</b>.<br><br>Combien de mètres fait-il en <b>10 heures</b> ?`,
      reponse: `En 2 heures (la moitié de 4) : 3 ÷ 2 = 1,5 m.<br>10 heures = 4 h + 4 h + 2 h.<br>Donc 3 + 3 + 1,5 = <span class="big">7,5 m</span>.<br>Autre chemin : en 1 heure, 3 ÷ 4 = 0,75 m. Et 10 × 0,75 = 7,5 m.`,
      consigne: "Combien de mètres fait l'escargot en 10 heures ?",
      verification: { type: "courte", attendus: ["7,5", "7.5"], unite: "m" },
      dessin: escargot(),
    },
  ],
};

export default problemes;
