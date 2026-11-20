// Énigmes à projeter — 5e, notion prop_proportionnalite (reconnaître,
// calculer une quatrième proportionnelle, graphique). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const crepes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une recette de crêpes : 250 g de farine pour 4 personnes">
  <rect x="60" y="60" width="360" height="160" rx="12" fill="${C.jaune}" fill-opacity=".12" stroke="${C.jaune}" stroke-width="3"/>
  <text x="240" y="110" fill="${C.jaune}" font-size="28" text-anchor="middle">Crêpes</text>
  <text x="240" y="160" fill="${C.craie}" font-size="26" text-anchor="middle">250 g de farine</text>
  <text x="240" y="200" fill="${C.craie}" font-size="26" text-anchor="middle">pour 4 personnes</text>
  <ellipse cx="240" cy="300" rx="110" ry="36" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>
  <text x="240" y="390" fill="${C.rose}" font-size="28" text-anchor="middle">pour 10 personnes : ? g</text>
  </svg>`;

// Un tableau à deux lignes.
const tableau = (titres: [string, string], l1: string[], l2: string[], y = 130) => {
  const n = l1.length, w = 300 / n;
  let s = `<rect x="40" y="${y}" width="400" height="120" fill="none" stroke="${C.craie}" stroke-width="3"/><path d="M40 ${y + 60} L440 ${y + 60} M140 ${y} L140 ${y + 120}" stroke="${C.craie}" stroke-width="3"/>`;
  s += `<text x="90" y="${y + 38}" fill="${C.bleu}" font-size="20" text-anchor="middle">${titres[0]}</text><text x="90" y="${y + 98}" fill="${C.jaune}" font-size="20" text-anchor="middle">${titres[1]}</text>`;
  for (let i = 0; i < n; i++) {
    if (i) s += `<path d="M${140 + w * i} ${y} L${140 + w * i} ${y + 120}" stroke="${C.craie}" stroke-width="2"/>`;
    s += `<text x="${140 + w * i + w / 2}" y="${y + 40}" fill="${C.craie}" font-size="26" text-anchor="middle">${l1[i]}</text>`;
    s += `<text x="${140 + w * i + w / 2}" y="${y + 100}" fill="${C.craie}" font-size="26" text-anchor="middle">${l2[i]}</text>`;
  }
  return s;
};

const taxi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le tarif d'un taxi : 2 km pour 6 euros, 5 km pour 12 euros">
  <text x="240" y="90" fill="${C.craie}" font-size="26" text-anchor="middle">Le tarif du taxi</text>
  ${tableau(["distance", "prix"], ["2 km", "5 km"], ["6 €", "12 €"])}
  <text x="240" y="340" fill="${C.rose}" font-size="26" text-anchor="middle">proportionnel ?</text>
  </svg>`;

const essence = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau : 3 litres pour 4,50 euros, 8 litres pour combien ?">
  <text x="240" y="90" fill="${C.craie}" font-size="26" text-anchor="middle">À la station</text>
  ${tableau(["litres", "prix"], ["3", "8"], ["4,50 €", "?"])}
  <text x="240" y="340" fill="${C.pale}" font-size="22" text-anchor="middle">le prix est proportionnel au volume</text>
  </svg>`;

// Trois petits graphiques : courbe, droite par l'origine, droite qui ne passe pas par l'origine.
const axes = (x: number, n: number, trace: string) =>
  `<path d="M${x} 300 L${x + 130} 300 M${x} 300 L${x} 150" stroke="${C.craie}" stroke-width="3"/>${trace}<text x="${x + 65}" y="345" fill="${C.craie}" font-size="22" text-anchor="middle">${n}</text>`;
const graphiques = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois graphiques : une courbe, une droite qui ne passe pas par l'origine, une droite qui passe par l'origine">
  <text x="240" y="90" fill="${C.craie}" font-size="24" text-anchor="middle">lequel montre la proportionnalité ?</text>
  ${axes(25, 1, `<path d="M25 300 Q90 290 145 160" stroke="${C.rose}" stroke-width="4" fill="none"/>`)}
  ${axes(175, 2, `<path d="M175 250 L300 170" stroke="${C.jaune}" stroke-width="4"/>`)}
  ${axes(325, 3, `<path d="M325 300 L450 170" stroke="${C.bleu}" stroke-width="4"/>`)}
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Léo à 4 ans mesure 1 m ; à 8 ans, mesure-t-il 2 m ?">
  <path d="M40 360 L440 360" stroke="${C.craie}" stroke-width="3"/>
  <circle cx="130" cy="255" r="14" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  <path d="M130 269 L130 315 M110 285 L150 285 M130 315 L116 360 M130 315 L144 360" stroke="${C.bleu}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="130" y="220" fill="${C.bleu}" font-size="22" text-anchor="middle">4 ans : 1 m</text>
  <circle cx="330" cy="134" r="14" fill="none" stroke="${C.rose}" stroke-width="4" stroke-dasharray="5 4"/>
  <path d="M330 148 L330 265 M300 190 L360 190 M330 265 L310 360 M330 265 L350 360" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="8 6"/>
  <text x="330" y="100" fill="${C.rose}" font-size="22" text-anchor="middle">8 ans : 2 m ?</text>
  <text x="240" y="400" fill="${C.pale}" font-size="18" text-anchor="middle">les deux au même rapport</text>
  </svg>`;

const robinets = () => {
  const r = (x: number, c: string) => `<path d="M${x} 80 L${x + 40} 80 L${x + 40} 100 L${x + 25} 100 L${x + 25} 115" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x + 25} 122 L${x + 25} 150" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="4 5"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une piscine remplie par des robinets">
  ${r(80, C.craie)}${r(170, C.craie)}${r(260, C.craie)}${r(350, C.rose)}
  <rect x="50" y="160" width="380" height="140" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="4"/>
  <text x="240" y="220" fill="${C.craie}" font-size="24" text-anchor="middle">3 robinets : 12 h</text>
  <text x="240" y="265" fill="${C.rose}" font-size="24" text-anchor="middle">4 robinets : ? h</text>
  <text x="240" y="360" fill="${C.pale}" font-size="20" text-anchor="middle">tous les robinets coulent pareil</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "prop_proportionnalite",
  titre: "Énigmes sur la proportionnalité",
  description: "Proportionnalité en 5e : recette de crêpes, tarif du taxi, prix de l'essence, lire un graphique, piège de la taille de Léo, robinets et piscine. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · En cuisine",
      titre: "La pâte à crêpes",
      question: `Pour <b>4 personnes</b>, il faut <b>250 g</b> de farine.<br><br><b>Combien de farine</b> pour <b>10 personnes</b> ?`,
      reponse: `Pour 2 personnes : 250 ÷ 2 = 125 g. Pour 10 personnes : 5 × 125 = 625 g.<br>Il faut <span class="big">625 g</span> de farine.`,
      consigne: "Combien de grammes de farine pour 10 personnes ?",
      verification: { type: "courte", attendus: ["625"], unite: "g" },
      dessin: crepes(),
    },
    {
      tag: "Énigme 2 · En ville",
      titre: "Le tarif du taxi",
      question: `Un taxi coûte <b>6 €</b> pour 2 km et <b>12 €</b> pour 5 km.<br><br><b>Le prix est-il proportionnel</b> à la distance ?`,
      reponse: `6 ÷ 2 = 3 € par km, mais 12 ÷ 5 = 2,40 € par km.<br>Ce n'est pas le même nombre : <span class="big">non</span>, ce n'est pas proportionnel.`,
      consigne: "Le prix du taxi est-il proportionnel à la distance ?",
      verification: { type: "qcm", choix: ["Oui", "Non", "On ne peut pas savoir"], bonne: 1 },
      dessin: taxi(),
    },
    {
      tag: "Énigme 3 · À la station",
      titre: "Le plein de la tondeuse",
      question: `<b>3 L</b> d'essence coûtent <b>4,50 €</b>.<br><br><b>Combien coûtent 8 L</b> ?`,
      reponse: `1 L coûte 4,50 ÷ 3 = 1,50 €.<br>8 L coûtent 8 × 1,50 = <span class="big">12 €</span>.`,
      consigne: "Combien coûtent 8 L d'essence, en euros ?",
      verification: { type: "courte", attendus: ["12", "12,00"], unite: "€" },
      dessin: essence(),
    },
    {
      tag: "Énigme 4 · Lire un graphique",
      titre: "Le bon graphique",
      question: `Voici trois graphiques.<br><br><b>Lequel montre une situation de proportionnalité ?</b>`,
      reponse: `La proportionnalité, c'est une <b>droite</b> qui <b>passe par l'origine</b>.<br>Le 1 n'est pas droit, le 2 ne part pas de l'origine : c'est le <span class="big">graphique 3</span>.`,
      consigne: "Quel graphique montre la proportionnalité ?",
      verification: { type: "qcm", choix: ["Graphique 1", "Graphique 2", "Graphique 3"], bonne: 2 },
      dessin: graphiques(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La taille de Léo",
      sorte: "piege",
      question: `À <b>4 ans</b>, Léo mesurait <b>1 m</b>.<br>Sa sœur dit : « À 8 ans, il mesurera 2 m. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! La taille <b>n'est pas proportionnelle</b> à l'âge : on grandit de moins en moins vite.<br>À 8 ans, un enfant mesure environ 1,30 m. Réponse : <span class="big">non</span>.`,
      consigne: "La sœur de Léo a-t-elle raison ?",
      verification: { type: "qcm", choix: ["Non, ce n'est pas proportionnel", "Oui, il mesurera 2 m", "Oui, car 8 = 2 × 4"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les robinets de la piscine",
      sorte: "defi",
      question: `<b>3 robinets</b> remplissent une piscine en <b>12 heures</b>.<br>Tous les robinets coulent pareil.<br><br><b>En combien d'heures</b> 4 robinets la remplissent-ils ?`,
      reponse: `Plus de robinets, moins de temps : ce n'est pas « × ».<br>1 robinet seul mettrait 3 × 12 = 36 h. Avec 4 : 36 ÷ 4 = <span class="big">9 h</span>.`,
      consigne: "En combien d'heures 4 robinets remplissent-ils la piscine ?",
      verification: { type: "courte", attendus: ["9"], unite: "h" },
      dessin: robinets(),
    },
  ],
};

export default problemes;
