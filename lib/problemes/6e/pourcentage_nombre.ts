// Énigmes à projeter — 6e, notion pourcentage_nombre (lire un pourcentage sur
// un quadrillage de 100, pourcentage et fraction, pourcentage et décimal,
// calculer 10 %, le piège de 50 % de 30, le défi de la citerne). 20/11/2026.
// Phrases courtes (les 6e lisent difficilement).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// La mosaïque : 10 × 10 carreaux, 35 bleus (3 colonnes pleines + 5 carreaux).
const mosaique = () => {
  let s = "";
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const bleu = c < 3 || (c === 3 && r < 5);
      s += `<rect x="${90 + 30 * c}" y="${40 + 30 * r}" width="30" height="30" fill="${bleu ? C.bleu : "none"}" fill-opacity=".6" stroke="${C.pale}" stroke-width="2"/>`;
    }
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une mosaïque carrée de 100 carreaux, dont une partie est bleue">
  ${s}
  <rect x="90" y="40" width="300" height="300" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <text x="240" y="385" fill="${C.craie}" font-size="26" text-anchor="middle">100 carreaux en tout</text>
  </svg>`;
};

// Le stade : 100 places (10 × 10), les 25 places du coin sont sous le toit.
const stade = () => {
  let s = "";
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const couverte = c < 5 && r < 5;
      s += `<circle cx="${105 + 30 * c}" cy="${95 + 30 * r}" r="10" fill="${couverte ? C.jaune : C.pale}" fill-opacity="${couverte ? ".8" : ".35"}"/>`;
    }
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une tribune de 100 places, avec un toit au-dessus d'une partie des places">
  <text x="240" y="40" fill="${C.craie}" font-size="24" text-anchor="middle">25 % des places sont couvertes</text>
  <rect x="88" y="74" width="154" height="154" fill="${C.bleu}" fill-opacity=".12" stroke="${C.bleu}" stroke-width="3"/>
  <path d="M82 70 L248 70" stroke="${C.bleu}" stroke-width="8" stroke-linecap="round"/>
  ${s}
  <text x="240" y="405" fill="${C.pale}" font-size="22" text-anchor="middle">100 places en tout</text>
  </svg>`;
};

// La méduse : une jauge de 300 px remplie à 95 % (285 px).
const meduse = () => {
  let tent = "";
  for (let k = 0; k < 5; k++) {
    const x = 90 + 30 * k;
    tent += `<path d="M${x} 200 q 12 25 0 50 q -12 25 0 50" stroke="${C.bleu}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une méduse et une jauge presque pleine d'eau">
  <path d="M70 200 A80 80 0 0 1 230 200 Z" fill="${C.bleu}" fill-opacity=".3" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>
  ${tent}
  <text x="150" y="350" fill="${C.craie}" font-size="28" text-anchor="middle">eau : 95${NB}%</text>
  <rect x="320" y="75" width="60" height="285" fill="${C.bleu}" fill-opacity=".35"/>
  <rect x="320" y="60" width="60" height="300" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <text x="390" y="67" fill="${C.pale}" font-size="20">100${NB}%</text>
  <text x="390" y="367" fill="${C.pale}" font-size="20">0${NB}%</text>
  <text x="240" y="405" fill="${C.rose}" font-size="26" text-anchor="middle">En nombre décimal${NB}?</text>
  </svg>`;
};

// La bibliothèque : 6 étagères de 10 livres = 60 livres, tous pareils.
const bibliotheque = () => {
  let s = "";
  for (let k = 0; k < 6; k++) {
    const bas = 110 + 50 * k;
    for (let i = 0; i < 10; i++) {
      s += `<rect x="${112 + 26 * i}" y="${bas - 38}" width="20" height="38" fill="${C.pale}" fill-opacity=".35" stroke="${C.craie}" stroke-width="2"/>`;
    }
    s += `<path d="M100 ${bas} L380 ${bas}" stroke="${C.jaune}" stroke-width="5" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Six étagères de dix livres chacune">
  <text x="240" y="45" fill="${C.craie}" font-size="26" text-anchor="middle">60 livres</text>
  ${s}
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">10${NB}% sont des BD</text>
  </svg>`;
};

// L'aquarium : 30 poissons (5 rangées de 6), tous de la même couleur.
const aquarium = () => {
  let s = "";
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 6; c++) {
      const x = 95 + 55 * c + (r % 2) * 12, y = 80 + 42 * r;
      s += `<ellipse cx="${x}" cy="${y}" rx="16" ry="10" fill="${C.pale}" fill-opacity=".5" stroke="${C.craie}" stroke-width="2"/>`;
      s += `<path d="M${x + 15} ${y} L${x + 28} ${y - 9} L${x + 28} ${y + 9} Z" fill="${C.pale}" fill-opacity=".5" stroke="${C.craie}" stroke-width="2" stroke-linejoin="round"/>`;
    }
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un aquarium avec trente poissons">
  <rect x="60" y="45" width="360" height="230" rx="10" fill="${C.bleu}" fill-opacity=".1" stroke="${C.craie}" stroke-width="4"/>
  ${s}
  <text x="240" y="315" fill="${C.craie}" font-size="26" text-anchor="middle">30 poissons. 50${NB}% sont rouges.</text>
  <text x="240" y="360" fill="${C.craie}" font-size="26" text-anchor="middle">Léo dit${NB}: 50 poissons rouges.</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;
};

// La citerne : 80 L pleine, remplie à 75 % (graduations tous les 25 %).
// Hauteur 300 px : 75 % = 225 px, le niveau est à y = 360 − 225 = 135.
const citerne = () => {
  let g = "";
  [0, 25, 50, 75, 100].forEach((p) => {
    const y = 360 - 3 * p;
    g += `<path d="M160 ${y} L178 ${y}" stroke="${C.craie}" stroke-width="3"/>`;
    g += `<text x="150" y="${y + 7}" fill="${C.pale}" font-size="20" text-anchor="end">${p}${NB}%</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une citerne graduée de 0 à 100 pour cent, remplie d'eau jusqu'à 75 pour cent">
  <rect x="160" y="135" width="160" height="225" fill="${C.bleu}" fill-opacity=".35"/>
  <path d="M160 135 L320 135" stroke="${C.bleu}" stroke-width="4"/>
  <rect x="160" y="60" width="160" height="300" fill="none" stroke="${C.craie}" stroke-width="4"/>
  ${g}
  <text x="400" y="75" fill="${C.craie}" font-size="22" text-anchor="middle">pleine</text>
  <text x="400" y="105" fill="${C.craie}" font-size="22" text-anchor="middle">= 80 L</text>
  <text x="400" y="230" font-size="44" text-anchor="middle">🌧️</text>
  <text x="240" y="400" fill="${C.rose}" font-size="24" text-anchor="middle">Combien de litres manquent${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "pourcentage_nombre",
  titre: "Énigmes sur les pourcentages",
  description: "La mosaïque bleue, la tribune couverte, l'eau de la méduse, les BD de la bibliothèque, le piège de l'aquarium, la citerne de pluie.",
  problemes: [
    {
      tag: "Énigme 1 · En arts plastiques",
      titre: "La mosaïque",
      question: `Maëlle fait une mosaïque.<br>Elle a <b>100 carreaux</b> en tout.<br>Elle en colorie une partie en bleu.<br><br>Quel <b>pourcentage</b> de la mosaïque est bleu ?`,
      reponse: `On compte les carreaux bleus.<br>3 colonnes pleines : 3 × 10 = 30. Plus 5 carreaux : 30 + 5 = 35.<br>35 carreaux sur 100, c'est 35 pour cent.<br>La mosaïque est bleue à <span class="big">35 %</span>.`,
      consigne: "Quel pourcentage de la mosaïque est bleu ?",
      verification: { type: "courte", attendus: ["35"], unite: "%" },
      dessin: mosaique(),
    },
    {
      tag: "Énigme 2 · Au stade",
      titre: "La tribune couverte",
      question: `Une tribune a 100 places.<br><b>25 %</b> des places sont sous le toit.<br><br>Quelle <b>fraction</b> des places est couverte ?`,
      reponse: `25 %, c'est 25 places sur 100.<br>Dans 100, il y a 4 fois 25 : 4 × 25 = 100.<br>Donc 25 places sur 100, c'est 1 part sur 4.<br>C'est <span class="big">le quart</span> des places.`,
      consigne: "Quelle fraction des places est couverte ?",
      verification: { type: "qcm", choix: ["La moitié", "Le quart", "Le tiers"], bonne: 1 },
      dessin: stade(),
    },
    {
      tag: "Énigme 3 · En sciences",
      titre: "L'eau de la méduse",
      question: `Une méduse est faite presque toute d'eau.<br>Son corps contient environ <b>95 %</b> d'eau.<br><br>Comment écrire 95 % avec un <b>nombre décimal</b> ?`,
      reponse: `95 %, c'est 95 sur 100.<br>95 centièmes s'écrit 0,95.<br>Vérifie : 0,95 × 100 = 95.<br>95 % = <span class="big">0,95</span>.`,
      consigne: "Comment écrire 95 % avec un nombre décimal ?",
      verification: { type: "qcm", choix: ["0,95", "9,5", "0,095"], bonne: 0 },
      dessin: meduse(),
    },
    {
      tag: "Énigme 4 · À la bibliothèque",
      titre: "Les BD",
      question: `La bibliothèque de la classe a <b>60 livres</b>.<br><b>10 %</b> de ces livres sont des BD.<br><br>Combien y a-t-il de <b>BD</b> ?`,
      reponse: `10 %, c'est 10 sur 100, donc 1 sur 10.<br>On partage 60 en 10 parts : 60 ÷ 10 = 6.<br>Vérifie : sur chaque étagère de 10 livres, 1 BD. 6 étagères : 6 BD.<br>Il y a <span class="big">6 BD</span>.`,
      consigne: "Combien y a-t-il de BD ?",
      verification: { type: "courte", attendus: ["6"], unite: "BD" },
      dessin: bibliotheque(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'aquarium de Léo",
      sorte: "piege",
      question: `Un aquarium a <b>30 poissons</b>.<br><b>50 %</b> des poissons sont rouges.<br>Léo dit : « Il y a 50 poissons rouges. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Il n'y a que 30 poissons en tout. On ne peut pas en avoir 50 rouges.<br>50 %, c'est 50 sur 100 : la <b>moitié</b>.<br>La moitié de 30 : 30 ÷ 2 = 15.<br>Il y a <span class="big">15 poissons rouges</span>.`,
      consigne: "Léo dit : « 50 poissons rouges ». A-t-il raison ?",
      verification: { type: "qcm", choix: ["Oui : 50 poissons rouges", "Non : 25 poissons rouges", "Non : 15 poissons rouges"], bonne: 2 },
      dessin: aquarium(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La citerne de pluie",
      sorte: "defi",
      question: `Une citerne garde l'eau de pluie.<br>Pleine, elle contient <b>80 L</b>.<br>Aujourd'hui, elle est remplie à <b>75 %</b>.<br><br>Combien de litres <b>manquent</b> pour la remplir ?`,
      reponse: `Pleine, c'est 100 %. Il manque 100 − 75 = 25 %.<br>25 %, c'est le quart : 80 ÷ 4 = 20.<br>Autre chemin : 75 % de 80, c'est 3 quarts : 3 × 20 = 60 L. Et 80 − 60 = 20.<br>Il manque <span class="big">20 L</span>.`,
      consigne: "Combien de litres manquent pour remplir la citerne ?",
      verification: { type: "courte", attendus: ["20"], unite: "L" },
      dessin: citerne(),
    },
  ],
};

export default problemes;
