// Énigmes à projeter — 5e, notion angle_mesure (complémentaires,
// supplémentaires, opposés par le sommet, angles et parallèles). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Les dessins sont au bon rapport (angles tracés à leur vraie mesure), sauf le piège.
const equerre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un angle droit coupé par une demi-droite : 35 degrés et un angle inconnu">
  <path d="M120 320 L430 320 M120 320 L120 40" stroke="${C.craie}" stroke-width="4" stroke-linecap="round"/>
  <path d="M120 300 L140 300 L140 320" stroke="${C.craie}" stroke-width="2" fill="none"/>
  <path d="M120 320 L366 148" stroke="${C.bleu}" stroke-width="4" stroke-linecap="round"/>
  <path d="M220 320 A100 100 0 0 0 201.9 262.6" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <text x="240" y="300" fill="${C.jaune}" font-size="26">35°</text>
  <path d="M173.2 282.7 A65 65 0 0 0 120 255" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="150" y="235" fill="${C.rose}" font-size="30">?</text>
  <text x="300" y="390" fill="${C.pale}" font-size="20" text-anchor="middle">un coin d'équerre, coupé en deux</text>
  </svg>`;

// Une route droite et un chemin qui part à 128° de la droite.
const route = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une route droite et un chemin : 128 degrés d'un côté, un angle inconnu de l'autre">
  <path d="M30 300 L450 300" stroke="${C.craie}" stroke-width="10" stroke-opacity=".25"/>
  <path d="M30 300 L450 300" stroke="${C.craie}" stroke-width="3"/>
  <path d="M240 300 L104.5 126.6" stroke="${C.bleu}" stroke-width="4" stroke-linecap="round"/>
  <path d="M300 300 A60 60 0 0 0 203.1 252.7" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <text x="300" y="250" fill="${C.jaune}" font-size="28">128°</text>
  <path d="M190 300 A50 50 0 0 1 209.2 260.6" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="140" y="280" fill="${C.rose}" font-size="30">?</text>
  <text x="240" y="370" fill="${C.pale}" font-size="20" text-anchor="middle">la route est bien droite</text>
  </svg>`;

// Deux lames croisées en (240 ; 210), à ±20° de l'horizontale : 40° à droite.
const ciseaux = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux lames de ciseaux croisées : 40 degrés d'un côté, un angle inconnu de l'autre">
  <path d="M52 142 L428 278 M52 278 L428 142" stroke="${C.craie}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="240" cy="210" r="7" fill="${C.craie}"/>
  <ellipse cx="70" cy="135" rx="30" ry="18" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  <ellipse cx="70" cy="285" rx="30" ry="18" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  <path d="M334 175.8 A100 100 0 0 1 334 244.2" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <text x="350" y="220" fill="${C.jaune}" font-size="26">40°</text>
  <path d="M155.4 240.8 A90 90 0 0 1 155.4 179.2" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="115" y="222" fill="${C.rose}" font-size="30">?</text>
  </svg>`;

// Deux rails parallèles (y = 140 et y = 280), une route qui les coupe à 65°.
const rails = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux rails parallèles coupés par une route ; un angle de 65 degrés en haut, un angle inconnu en bas au même endroit">
  <path d="M30 140 L450 140 M30 280 L450 280" stroke="${C.craie}" stroke-width="4"/>
  <path d="M440 132 L450 140 L440 148 M440 272 L450 280 L440 288" stroke="${C.craie}" stroke-width="2" fill="none"/>
  <path d="M153.4 40 L311.9 380" stroke="${C.bleu}" stroke-width="4" stroke-linecap="round"/>
  <path d="M240 140 A40 40 0 0 1 216.9 176.3" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <text x="245" y="180" fill="${C.jaune}" font-size="26">65°</text>
  <path d="M305.3 280 A40 40 0 0 1 282.2 316.3" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="310" y="322" fill="${C.rose}" font-size="30">?</text>
  <text x="40" y="125" fill="${C.pale}" font-size="20">rail</text><text x="40" y="265" fill="${C.pale}" font-size="20">rail</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux droites qui ne sont pas parallèles, coupées par une sécante ; 70 degrés et un angle inconnu">
  <path d="M30 130 L450 130 M30 320 L450 240" stroke="${C.craie}" stroke-width="4"/>
  <path d="M170 40 L330 380" stroke="${C.bleu}" stroke-width="4" stroke-linecap="round"/>
  <text x="240" y="172" fill="${C.jaune}" font-size="26">70°</text>
  <text x="250" y="260" fill="${C.rose}" font-size="30">?</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  </svg>`;

// Horloge à 2 h 30 : petite aiguille à 75° de midi, grande aiguille sur le 6.
const horloge = () => {
  let s = "";
  for (let h = 0; h < 12; h++) {
    const a = (Math.PI / 6) * h;
    s += `<path d="M${(240 + 125 * Math.sin(a)).toFixed(1)} ${(210 - 125 * Math.cos(a)).toFixed(1)} L${(240 + 140 * Math.sin(a)).toFixed(1)} ${(210 - 140 * Math.cos(a)).toFixed(1)}" stroke="${C.craie}" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une horloge qui indique 2 h 30">
  <circle cx="240" cy="210" r="150" fill="none" stroke="${C.craie}" stroke-width="5"/>
  ${s}
  <text x="240" y="114" fill="${C.pale}" font-size="24" text-anchor="middle">12</text>
  <text x="262" y="326" fill="${C.pale}" font-size="24" text-anchor="middle">6</text>
  <path d="M240 210 L327 186.7" stroke="${C.rose}" stroke-width="8" stroke-linecap="round"/>
  <path d="M240 210 L240 330" stroke="${C.bleu}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="240" cy="210" r="8" fill="${C.craie}"/>
  <text x="240" y="400" fill="${C.jaune}" font-size="24" text-anchor="middle">angle entre les aiguilles : ?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "angle_mesure",
  titre: "Énigmes sur les angles",
  description: "Angles en 5e : angles complémentaires et supplémentaires, opposés par le sommet, angles et droites parallèles, piège des droites non parallèles, l'angle des aiguilles à 2 h 30. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le coin de l'équerre",
      titre: "Complémentaires",
      question: `Une demi-droite coupe un <b>angle droit</b> en deux angles.<br>L'un mesure <b>35°</b>.<br><br><b>Combien mesure l'autre ?</b>`,
      reponse: `Les deux angles font ensemble 90° : ils sont complémentaires.<br>90 − 35 = <span class="big">55°</span>.`,
      consigne: "Combien mesure l'autre angle ?",
      verification: { type: "courte", attendus: ["55"], unite: "°" },
      dessin: equerre(),
    },
    {
      tag: "Énigme 2 · Le chemin",
      titre: "Supplémentaires",
      question: `Un chemin part d'une route <b>droite</b>.<br>D'un côté, l'angle mesure <b>128°</b>.<br><br><b>Combien mesure l'angle de l'autre côté ?</b>`,
      reponse: `Une droite fait un angle plat : 180°. Les deux angles sont supplémentaires.<br>180 − 128 = <span class="big">52°</span>.`,
      consigne: "Combien mesure l'angle de l'autre côté ?",
      verification: { type: "courte", attendus: ["52"], unite: "°" },
      dessin: route(),
    },
    {
      tag: "Énigme 3 · Les ciseaux",
      titre: "Opposés par le sommet",
      question: `Les lames d'une paire de ciseaux s'ouvrent de <b>40°</b>.<br><br><b>Combien mesure l'angle</b> de l'autre côté, entre les poignées ?`,
      reponse: `Les deux angles sont opposés par le sommet : ils ont la même mesure.<br>L'angle mesure <span class="big">40°</span>.`,
      consigne: "Combien mesure l'angle entre les poignées ?",
      verification: { type: "qcm", choix: ["140°", "40°", "50°"], bonne: 1 },
      dessin: ciseaux(),
    },
    {
      tag: "Énigme 4 · Le passage à niveau",
      titre: "La route et les rails",
      question: `Deux rails sont <b>parallèles</b>. Une route les coupe.<br>En haut, l'angle mesure <b>65°</b>.<br><br><b>Combien mesure l'angle « ? »</b>, au même endroit en bas ?`,
      reponse: `Les deux angles sont correspondants, et les rails sont parallèles.<br>Ils ont la même mesure : <span class="big">65°</span>.`,
      consigne: "Combien mesure l'angle « ? » ?",
      verification: { type: "qcm", choix: ["65°", "115°", "25°"], bonne: 0 },
      dessin: rails(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Des droites pas parallèles",
      sorte: "piege",
      question: `Ces deux droites <b>ne sont pas parallèles</b>. Une sécante les coupe.<br>Un angle mesure <b>70°</b>.<br><br>Ilan dit : « L'angle alterne-interne mesure aussi 70°. » <b>A-t-il raison ?</b>`,
      reponse: `Non ! Les angles alternes-internes sont égaux <b>seulement</b> si les droites sont parallèles.<br>Ici, <span class="big">on ne peut pas savoir</span> sans mesurer.`,
      consigne: "Combien mesure l'angle « ? » ?",
      verification: { type: "qcm", choix: ["70°", "110°", "On ne peut pas savoir"], bonne: 2 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les aiguilles à 2 h 30",
      sorte: "defi",
      question: `Il est <b>2 h 30</b>.<br><br><b>Quel angle</b> font les deux aiguilles de l'horloge ?`,
      reponse: `Une heure = 360 ÷ 12 = 30°. La petite aiguille est à mi-chemin entre 2 et 3 : 2,5 × 30 = 75° après midi. La grande est sur le 6 : 180°.<br>180 − 75 = <span class="big">105°</span>.`,
      consigne: "Quel angle font les aiguilles à 2 h 30 ?",
      verification: { type: "courte", attendus: ["105"], unite: "°" },
      dessin: horloge(),
    },
  ],
};

export default problemes;
