// Énigmes à projeter — 5e, notion volume_solide (pavé, prisme droit,
// cylindre, unités de volume et contenances). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const etiq = (x: number, y: number, t: string, c: string = C.craie, taille = 24) =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="${taille}" text-anchor="middle">${t}</text>`;

// Un pavé en perspective cavalière : face avant l × h, fuite (f ; −f).
const pave = (x: number, y: number, l: number, h: number, f: number, c: string) =>
  `<path d="M${x} ${y} L${x + l} ${y} L${x + l} ${y + h} L${x} ${y + h} Z" fill="${c}" fill-opacity=".18" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>` +
  `<path d="M${x} ${y} L${x + f} ${y - f} L${x + l + f} ${y - f} L${x + l} ${y} M${x + l + f} ${y - f} L${x + l + f} ${y + h - f} L${x + l} ${y + h}" stroke="${C.craie}" stroke-width="3" fill="none" stroke-linejoin="round"/>` +
  `<path d="M${x} ${y + h} L${x + f} ${y + h - f} L${x + l + f} ${y + h - f} M${x + f} ${y - f} L${x + f} ${y + h - f}" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>`;

// Aquarium 50 × 30 × 40 cm : 5 px par cm (fuite à 45° réduite).
const aquarium = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un aquarium en forme de pavé : 50 cm, 30 cm et 40 cm">
  ${pave(80, 150, 250, 200, 75, C.bleu)}
  ${etiq(205, 385, "50 cm")}${etiq(50, 255, "40 cm")}${etiq(445, 125, "30 cm")}
  ${etiq(240, 60, "contenance : ? L", C.rose, 28)}
  </svg>`;

// Prisme droit à base triangle rectangle (3 cm et 4 cm), hauteur 12 cm. Pas à l'échelle.
const prisme = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une boîte en prisme droit : la base est un triangle rectangle de côtés 3 cm et 4 cm, la hauteur est 12 cm">
  <path d="M60 300 L180 300 L60 210 Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M60 210 L340 110 L460 200 L180 300 M460 200 L340 200 M340 110 L340 200" stroke="${C.craie}" stroke-width="3" fill="none" stroke-linejoin="round"/>
  <path d="M60 300 L340 200" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5"/>
  <path d="M60 285 L75 285 L75 300" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${etiq(120, 330, "4 cm")}${etiq(32, 262, "3 cm")}${etiq(360, 285, "12 cm", C.bleu)}
  ${etiq(240, 60, "volume : ? cm³", C.rose, 28)}
  ${etiq(240, 395, "pas à l'échelle", C.pale, 18)}
  </svg>`;

// Boîte de conserve : rayon 4 cm, hauteur 10 cm, 22 px par cm.
const conserve = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une boîte de conserve en cylindre : rayon 4 cm, hauteur 10 cm">
  <path d="M152 80 L152 300 A88 26 0 0 0 328 300 L328 80" fill="${C.rose}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <ellipse cx="240" cy="80" rx="88" ry="26" fill="${C.rose}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  <path d="M240 80 L328 80" stroke="${C.craie}" stroke-width="3"/>
  ${etiq(284, 46, "4 cm", C.craie, 20)}
  <path d="M360 80 L360 300" stroke="${C.bleu}" stroke-width="3"/>
  ${etiq(405, 196, "10 cm", C.bleu)}
  ${etiq(240, 380, "π ≈ 3,14 · volume : ?", C.rose, 26)}
  </svg>`;

const citerne = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une citerne de récupération d'eau de 2,5 mètres cubes">
  ${pave(90, 150, 230, 180, 70, C.bleu)}
  <path d="M90 230 L320 230" stroke="${C.bleu}" stroke-width="2"/>
  ${etiq(205, 290, "2,5 m³", C.craie, 34)}
  ${etiq(240, 385, "contenance : ? L", C.rose, 28)}
  </svg>`;

// Un cube de 2 cm et un cube de 4 cm (30 px par cm).
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un petit cube de 2 cm et un grand cube de 4 cm">
  ${pave(50, 260, 60, 60, 25, C.jaune)}
  ${etiq(80, 350, "2 cm")}
  ${pave(220, 200, 120, 120, 50, C.rose)}
  ${etiq(280, 350, "4 cm")}
  ${etiq(240, 80, "« arêtes × 2, donc volume × 2 »", C.rose, 26)}
  </svg>`;

const bassin = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un bassin en pavé de 4 m sur 3 m, profond de 1,5 m, rempli par un tuyau">
  ${pave(70, 190, 280, 105, 90, C.bleu)}
  ${etiq(210, 330, "4 m")}${etiq(458, 155, "3 m")}${etiq(40, 250, "1,5 m")}
  <path d="M440 40 L300 40 Q280 40 280 60 L280 120" stroke="${C.jaune}" stroke-width="8" fill="none" stroke-linecap="round"/>
  ${etiq(360, 30, "30 L par minute", C.jaune, 22)}
  ${etiq(240, 390, "rempli en ? heures", C.rose, 28)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "volume_solide",
  titre: "Énigmes sur les volumes",
  description: "Volumes en 5e : contenance d'un aquarium, boîte en prisme droit, boîte de conserve cylindrique, citerne en m³, piège du cube doublé, remplir un bassin. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · L'aquarium",
      titre: "Combien de litres ?",
      question: `Un aquarium est un pavé de <b>50 cm</b> sur <b>30 cm</b>, haut de <b>40 cm</b>.<br><br><b>Combien de litres</b> contient-il, plein ?`,
      reponse: `50 × 30 × 40 = 60 000 cm³. Et 1 L = 1 dm³ = 1 000 cm³.<br>60 000 ÷ 1 000 = <span class="big">60 L</span>.`,
      consigne: "Combien de litres contient l'aquarium plein ?",
      verification: { type: "courte", attendus: ["60"], unite: "L" },
      dessin: aquarium(),
    },
    {
      tag: "Énigme 2 · La boîte de chocolats",
      titre: "Le prisme droit",
      question: `Une boîte est un <b>prisme droit</b>. Sa base est un triangle rectangle de côtés <b>3 cm</b> et <b>4 cm</b> (l'angle droit entre les deux). Sa hauteur est <b>12 cm</b>.<br><br><b>Quel est son volume ?</b>`,
      reponse: `Aire de la base : 3 × 4 ÷ 2 = 6 cm². Volume : aire de la base × hauteur.<br>6 × 12 = <span class="big">72 cm³</span>.`,
      consigne: "Quel est le volume de la boîte, en cm³ ?",
      verification: { type: "courte", attendus: ["72"], unite: "cm³" },
      dessin: prisme(),
    },
    {
      tag: "Énigme 3 · La conserve",
      titre: "Le cylindre",
      question: `Une boîte de conserve est un <b>cylindre</b> de rayon <b>4 cm</b> et de hauteur <b>10 cm</b>.<br><br><b>Quel est son volume</b>, à peu près ? (π ≈ 3,14.)`,
      reponse: `Aire de la base : 3,14 × 4 × 4 = 50,24 cm². Volume : 50,24 × 10 = 502,4.<br>Environ <span class="big">502,4 cm³</span>, soit à peu près un demi-litre.`,
      consigne: "Quel est le volume de la boîte, à peu près ?",
      verification: { type: "qcm", choix: ["≈ 125,6 cm³", "≈ 251,2 cm³", "≈ 502,4 cm³"], bonne: 2 },
      dessin: conserve(),
    },
    {
      tag: "Énigme 4 · Au jardin",
      titre: "La citerne",
      question: `Une citerne récupère l'eau de pluie. Son volume est de <b>2,5 m³</b>.<br><br><b>Combien de litres</b> peut-elle contenir ?`,
      reponse: `1 m³ = 1 000 dm³ = 1 000 L.<br>2,5 × 1 000 = <span class="big">2 500 L</span>.`,
      consigne: "Combien de litres contient la citerne ?",
      verification: { type: "courte", attendus: ["2500", "2 500"], unite: "L" },
      dessin: citerne(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cube doublé",
      sorte: "piege",
      question: `Un cube a des arêtes de <b>2 cm</b>. Un autre a des arêtes de <b>4 cm</b>.<br>Nour dit : « Les arêtes sont 2 fois plus longues, donc le volume est 2 fois plus grand. »<br><br><b>Par combien</b> le volume est-il vraiment multiplié ?`,
      reponse: `Petit cube : 2 × 2 × 2 = 8 cm³. Grand cube : 4 × 4 × 4 = 64 cm³.<br>64 ÷ 8 = 8 : le volume est multiplié par <span class="big">8</span>.`,
      consigne: "Par combien le volume est-il multiplié ?",
      verification: { type: "qcm", choix: ["× 2", "× 8", "× 4"], bonne: 1 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Remplir le bassin",
      sorte: "defi",
      question: `Un bassin est un pavé de <b>4 m</b> sur <b>3 m</b>, profond de <b>1,5 m</b>.<br>Un tuyau verse <b>30 L par minute</b>.<br><br><b>Combien d'heures</b> faut-il pour le remplir ?`,
      reponse: `4 × 3 × 1,5 = 18 m³ = 18 000 L. 18 000 ÷ 30 = 600 minutes.<br>600 ÷ 60 = <span class="big">10 heures</span>.`,
      consigne: "Combien d'heures faut-il pour remplir le bassin ?",
      verification: { type: "courte", attendus: ["10"], unite: "h" },
      dessin: bassin(),
    },
  ],
};

export default problemes;
