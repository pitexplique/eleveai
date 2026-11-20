// Énigmes à projeter — 5e, notion stat_statistique (moyenne, effectifs,
// fréquences, diagrammes). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const etiq = (x: number, y: number, t: string, c: string = C.craie, taille = 24) =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="${taille}" text-anchor="middle">${t}</text>`;
const cartes = (notes: string[], c: string, y = 140) =>
  notes.map((n, i) => {
    const x = 240 - (notes.length * 90 - 20) / 2 + 90 * i;
    return `<rect x="${x}" y="${y}" width="70" height="90" rx="10" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-width="3"/>` + etiq(x + 35, y + 58, n, C.craie, 32);
  }).join("");

const notes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Quatre notes : 12, 15, 9 et 14">
  ${etiq(240, 90, "les notes d'Aya ce trimestre", C.craie, 26)}
  ${cartes(["12", "15", "9", "14"], C.bleu)}
  ${etiq(240, 320, "moyenne : ?", C.rose, 30)}
  </svg>`;

// Diagramme en barres : 30 px par élève, base y = 340.
const sports = () => {
  const d: [string, number, string][] = [["foot", 8, C.bleu], ["basket", 5, C.jaune], ["natation", 7, C.bleu], ["danse", 4, C.rose]];
  let s = `<path d="M80 340 L450 340 M80 340 L80 80" stroke="${C.craie}" stroke-width="3"/>`;
  for (let k = 0; k <= 8; k += 2) s += `<path d="M74 ${340 - 30 * k} L80 ${340 - 30 * k}" stroke="${C.craie}" stroke-width="2"/><text x="68" y="${346 - 30 * k}" fill="${C.craie}" font-size="18" text-anchor="end">${k}</text>`;
  d.forEach(([n, v, c], i) => {
    s += `<rect x="${100 + 85 * i}" y="${340 - 30 * v}" width="60" height="${30 * v}" fill="${c}" fill-opacity=".35" stroke="${c}" stroke-width="3"/>`;
    s += etiq(130 + 85 * i, 370, n, C.craie, 20);
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Diagramme en barres : foot 8, basket 5, natation 7, danse 4">
  ${etiq(260, 50, "le sport préféré de la classe", C.craie, 24)}
  ${s}
  ${etiq(30, 70, "élèves", C.pale, 18)}
  </svg>`;
};

// Roue de loterie en 4 secteurs et 30 lancers.
const roue = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une roue de loterie et le résultat : 9 fois rouge sur 30 lancers">
  <circle cx="150" cy="200" r="110" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <path d="M150 200 L150 90 A110 110 0 0 1 260 200 Z" fill="${C.rose}" fill-opacity=".35"/>
  <path d="M150 200 L260 200 A110 110 0 0 1 150 310 Z" fill="${C.bleu}" fill-opacity=".3"/>
  <path d="M150 200 L150 310 A110 110 0 0 1 40 200 Z" fill="${C.jaune}" fill-opacity=".35"/>
  <path d="M150 90 L150 310 M40 200 L260 200" stroke="${C.craie}" stroke-width="3"/>
  <path d="M150 70 L140 50 L160 50 Z" fill="${C.craie}"/>
  ${etiq(370, 150, "30 lancers", C.craie, 26)}
  ${etiq(370, 200, "rouge : 9 fois", C.rose, 26)}
  ${etiq(370, 270, "fréquence : ? %", C.rose, 26)}
  </svg>`;

// Diagramme circulaire : un quart de disque.
const camembert = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un diagramme circulaire : un quart du disque pour le vélo">
  <circle cx="240" cy="210" r="140" fill="${C.pale}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <path d="M240 210 L240 70 A140 140 0 0 1 380 210 Z" fill="${C.bleu}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>
  <path d="M240 180 L270 180 L270 210" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${etiq(315, 150, "vélo", C.bleu, 24)}
  ${etiq(180, 260, "les autres", C.pale, 22)}
  ${etiq(240, 395, "le quart des élèves vient à vélo", C.craie, 22)}
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Quatre notes : 10, 10, 10 et 20">
  ${cartes(["10", "10", "10", "20"], C.jaune)}
  ${etiq(240, 90, "« (10 + 20) ÷ 2 = 15 »", C.rose, 30)}
  ${etiq(240, 320, "la vraie moyenne : ?", C.craie, 28)}
  </svg>`;

const defi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Quatre notes de moyenne 13 et une cinquième note inconnue">
  ${etiq(240, 80, "4 notes : moyenne 13", C.craie, 28)}
  ${cartes(["?", "?", "?", "?", "?"], C.bleu)}
  <rect x="385" y="140" width="70" height="90" rx="10" fill="none" stroke="${C.rose}" stroke-width="5"/>
  ${etiq(240, 320, "5 notes : moyenne 14", C.rose, 28)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "stat_statistique",
  titre: "Énigmes de statistiques",
  description: "Statistiques en 5e : calculer une moyenne, lire un diagramme en barres, fréquence d'une roue, diagramme circulaire, piège de la moyenne, la note qu'il faut. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le bulletin",
      titre: "La moyenne d'Aya",
      question: `Aya a eu <b>12</b>, <b>15</b>, <b>9</b> et <b>14</b> ce trimestre.<br><br><b>Quelle est sa moyenne ?</b>`,
      reponse: `On additionne : 12 + 15 + 9 + 14 = 50. On divise par le nombre de notes : 50 ÷ 4 = 12,5.<br>Sa moyenne est <span class="big">12,5</span>.`,
      consigne: "Quelle est la moyenne d'Aya ?",
      verification: { type: "courte", attendus: ["12,5", "12.5"] },
      dessin: notes(),
    },
    {
      tag: "Énigme 2 · Le sondage",
      titre: "Combien d'élèves ?",
      question: `Ce diagramme donne le sport préféré de chaque élève d'une classe.<br><br><b>Combien d'élèves</b> ont répondu ?`,
      reponse: `On lit chaque barre : 8 + 5 + 7 + 4 = 24.<br><span class="big">24 élèves</span> ont répondu.`,
      consigne: "Combien d'élèves ont répondu ?",
      verification: { type: "courte", attendus: ["24"], unite: "élèves" },
      dessin: sports(),
    },
    {
      tag: "Énigme 3 · À la kermesse",
      titre: "La roue de loterie",
      question: `On fait tourner une roue <b>30 fois</b>. Elle s'arrête <b>9 fois</b> sur le rouge.<br><br><b>Quelle est la fréquence</b> du rouge, en pourcentage ?`,
      reponse: `Fréquence : 9 ÷ 30 = 0,3.<br>0,3 = 30 sur 100 = <span class="big">30 %</span>.`,
      consigne: "Quelle est la fréquence du rouge, en % ?",
      verification: { type: "courte", attendus: ["30"], unite: "%" },
      dessin: roue(),
    },
    {
      tag: "Énigme 4 · Le diagramme circulaire",
      titre: "L'angle du vélo",
      question: `Dans un collège, <b>le quart</b> des élèves vient à vélo.<br><br>Sur le diagramme circulaire, <b>quel angle</b> mesure la part du vélo ?`,
      reponse: `Le disque entier fait 360°.<br>Un quart : 360 ÷ 4 = <span class="big">90°</span>, un angle droit.`,
      consigne: "Quel angle mesure la part du vélo ?",
      verification: { type: "qcm", choix: ["25°", "90°", "45°"], bonne: 1 },
      dessin: camembert(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La moyenne de Noam",
      sorte: "piege",
      question: `Noam a eu <b>10</b>, <b>10</b>, <b>10</b> et <b>20</b>.<br>Il dit : « Ma moyenne, c'est (10 + 20) ÷ 2 = 15. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Il a <b>quatre</b> notes, pas deux.<br>10 + 10 + 10 + 20 = 50, et 50 ÷ 4 = <span class="big">12,5</span>.`,
      consigne: "Quelle est la vraie moyenne de Noam ?",
      verification: { type: "qcm", choix: ["12,5", "15", "13"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La note qu'il faut",
      sorte: "defi",
      question: `Léon a <b>4 notes</b>, de moyenne <b>13</b>.<br>Il veut <b>14</b> de moyenne après sa 5<sup>e</sup> note.<br><br><b>Quelle note</b> doit-il avoir ?`,
      reponse: `Ses 4 notes font 4 × 13 = 52 points. Avec 5 notes de moyenne 14, il faut 5 × 14 = 70 points.<br>70 − 52 = <span class="big">18</span>.`,
      consigne: "Quelle note doit avoir Léon ?",
      verification: { type: "courte", attendus: ["18"] },
      dessin: defi(),
    },
  ],
};

export default problemes;
