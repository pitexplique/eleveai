// Énigmes à projeter — 4e, notion ordre_grandeur (le microscope : du
// micromètre au millimètre, le musée des sciences : associer une puissance de
// dix à un objet réel, le médecin : estimer les battements du cœur en un jour,
// la boulangerie : juger la farine annoncée par l'apprenti, piège du seau de
// sable : on AJOUTE les exposants, défi de l'Everest en feuilles de papier :
// diviser par une puissance négative). Niveau de la fiche
// lib/fiches/maths-4e-ordres-grandeur.tsx : préfixes de nano à giga, rang
// plutôt que chiffre, « arrondir d'abord, multiplier ensuite ».
// Chaque estimation vérifiée contre le calcul exact :
//  - 1 000 µm ÷ 8 µm = 125 (exact) ;
//  - 70 × 60 × 24 = 100 800 ≈ 100 000 (estimé 4 000 × 25) ;
//  - 240 × 160 g = 38 400 g = 38,4 kg ≈ 40 kg (estimé 250 × 160 = 40 000 g) ;
//  - 8 000 cm³ × 10 000 grains = 8 × 10⁷ ≈ 10⁸ ;
//  - 8 849 m ÷ 0,0001 m = 88 490 000 ≈ 9 × 10⁷ (estimé 9 000 ÷ 10⁻⁴).
// Dessins sans échelle (« pas à l'échelle » quand une longueur est montrée).
// Pas de La Réunion. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Le champ du microscope : globules de 44 px (pas à l'échelle du millimètre).
const microscope = () => {
  const globules = [
    [150, 190], [200, 190], [250, 190], [300, 190],
    [185, 120], [295, 122], [240, 262], [320, 255],
  ];
  const g = globules
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22" fill="${C.rose}" fill-opacity=".3" stroke="${C.rose}" stroke-width="3"/>`)
    .join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Des globules rouges vus au microscope ; chacun mesure 8 micromètres ; combien en aligne-t-on sur 1 millimètre ?">
  ${txt(20, 36, "pas à l'échelle", C.pale, 20, "start")}
  <text x="430" y="70" font-size="40" text-anchor="middle">🔬</text>
  <circle cx="240" cy="190" r="130" fill="none" stroke="${C.craie}" stroke-width="4"/>
  ${g}
  <path d="M128 150 L128 166 M172 150 L172 166 M128 158 L172 158" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  ${txt(102, 150, "8 µm", C.bleu, 22, "end")}
  <path d="M110 345 L370 345 M110 335 L110 355 M370 335 L370 355" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(240, 372, "1 mm", C.craie, 22)}
  ${txt(240, 400, `sur 1 mm${NB}: ? globules`, C.rose, 24)}
  </svg>`;
};

// La vitrine du musée : trois objets, trois étiquettes tombées.
const vitrine = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une vitrine avec une coccinelle, un vélo et une baleine bleue ; trois étiquettes sont tombées : 10 puissance moins 2 mètre, 10 puissance 0 mètre, 10 puissance 1 mètre">
  <rect x="40" y="40" width="110" height="46" rx="10" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(95, 72, "10¹ m", C.bleu, 24)}
  <rect x="185" y="40" width="110" height="46" rx="10" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(240, 72, "10⁻² m", C.bleu, 24)}
  <rect x="330" y="40" width="110" height="46" rx="10" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(385, 72, "10⁰ m", C.bleu, 24)}
  <text x="95" y="235" font-size="56" text-anchor="middle">🐞</text>
  <text x="240" y="235" font-size="56" text-anchor="middle">🚲</text>
  <text x="385" y="235" font-size="56" text-anchor="middle">🐋</text>
  <path d="M30 255 L450 255" stroke="${C.craie}" stroke-width="4" fill="none"/>
  <rect x="50" y="272" width="90" height="44" rx="8" fill="none" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5"/>
  <rect x="195" y="272" width="90" height="44" rx="8" fill="none" stroke="${C.rose}" stroke-width="3" stroke-dasharray="6 5"/>
  <rect x="340" y="272" width="90" height="44" rx="8" fill="none" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5"/>
  ${txt(95, 302, "?", C.pale, 24)}
  ${txt(240, 302, "?", C.rose, 24)}
  ${txt(385, 302, "?", C.pale, 24)}
  ${txt(240, 380, `Sous le vélo${NB}?`, C.rose, 24)}
  </svg>`;

// Le cœur : une ligne de battements, les deux conversions de temps.
const coeur = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un cœur qui bat 70 fois par minute ; une journée dure 24 heures et une heure 60 minutes">
  <text x="110" y="140" font-size="80" text-anchor="middle">❤️</text>
  ${txt(320, 100, "70 battements", C.rose, 26)}
  ${txt(320, 134, "par minute", C.rose, 24)}
  <path d="M30 200 L150 200 L165 172 L182 232 L197 190 L207 200 L270 200 L285 172 L302 232 L317 190 L327 200 L450 200" stroke="${C.rose}" stroke-width="3" fill="none" stroke-linejoin="round"/>
  ${txt(240, 270, "1 jour = 24 h", C.bleu, 24)}
  ${txt(240, 306, "1 h = 60 min", C.bleu, 24)}
  ${txt(240, 380, `En 1 jour${NB}: ? battements`, C.rose, 24)}
  </svg>`;

// La boulangerie : les baguettes, le sac de farine, l'annonce de l'apprenti.
const boulangerie = () => `<svg viewBox="0 0 480 420" role="img" aria-label="240 baguettes de 160 grammes de farine chacune ; l'apprenti annonce 3 840 kilogrammes de farine">
  <text x="100" y="120" font-size="64" text-anchor="middle">🥖</text>
  ${txt(310, 88, "240 baguettes", C.craie, 26)}
  ${txt(310, 124, "160 g de farine chacune", C.craie, 22)}
  <path d="M190 190 Q240 170 290 190 L305 290 Q240 305 175 290 Z" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  ${txt(240, 250, "farine", C.jaune, 24)}
  <rect x="70" y="320" width="340" height="50" rx="14" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 353, `L'apprenti${NB}: «${NB}3${NB}840 kg${NB}»`, C.rose, 24)}
  ${txt(240, 400, `Vraisemblable${NB}?`, C.pale, 22)}
  </svg>`;

// Le seau de sable : les deux puissances de dix, le calcul de Léo.
const sable = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un seau de 8 litres de sable, environ 10 puissance 4 centimètres cubes ; 1 centimètre cube contient environ 10 puissance 4 grains ; Léo écrit 10 puissance 4 fois 10 puissance 4 égale 10 puissance 16">
  <text x="100" y="160" font-size="80" text-anchor="middle">🪣</text>
  ${txt(320, 110, "8 L ≈ 10⁴ cm³", C.bleu, 26)}
  ${txt(320, 160, "1 cm³ ≈ 10⁴ grains", C.bleu, 24)}
  <circle cx="230" cy="220" r="4" fill="${C.jaune}"/><circle cx="246" cy="214" r="4" fill="${C.jaune}"/>
  <circle cx="262" cy="222" r="4" fill="${C.jaune}"/><circle cx="238" cy="232" r="4" fill="${C.jaune}"/>
  <circle cx="254" cy="234" r="4" fill="${C.jaune}"/>
  <rect x="60" y="268" width="360" height="52" rx="14" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 303, `Léo${NB}: 10⁴ × 10⁴ = 10¹⁶`, C.rose, 26)}
  ${txt(240, 384, `Combien de grains${NB}?`, C.craie, 24)}
  </svg>`;

// L'Everest et la ramette : pas à l'échelle, évidemment.
const everest = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le mont Everest, 8 849 mètres, et une ramette de 500 feuilles épaisse de 5 centimètres">
  ${txt(20, 36, "pas à l'échelle", C.pale, 20, "start")}
  <polygon points="40,330 120,210 165,240 230,100 330,330" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M205 157 L230 100 L252 150 L238 142 L226 156 L215 148 Z" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${txt(230, 84, `8${NB}849 m`, C.bleu, 26)}
  <rect x="370" y="286" width="80" height="44" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="3"/>
  <path d="M370 297 L450 297 M370 308 L450 308 M370 319 L450 319" stroke="${C.jaune}" stroke-width="1.5" fill="none"/>
  ${txt(410, 270, "5 cm", C.jaune, 22)}
  ${txt(410, 360, "500 feuilles", C.jaune, 20)}
  ${txt(240, 398, `Feuilles empilées${NB}: ? millions`, C.rose, 24)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "ordre_grandeur",
  titre: "Énigmes sur les ordres de grandeur",
  description: "Le microscope, le musée des sciences, le cœur qui bat, la farine du boulanger, le piège du seau de sable, le défi de l'Everest en feuilles de papier : préfixes de nano à giga, ordre de grandeur d'un objet, estimation d'un calcul et vraisemblance d'un résultat.",
  problemes: [
    {
      tag: "Énigme 1 · Au microscope",
      titre: "Les globules alignés",
      question: `Au microscope, Yanis observe des globules rouges.<br>Chacun mesure environ <b>8 µm</b> (micromètres).<br>Il imagine des globules alignés, bord à bord, sur <b>1 mm</b>.<br><br>Combien de globules faut-il ?`,
      reponse: `Micro vaut 10<sup>−6</sup> et milli vaut 10<sup>−3</sup>.<br>L'écart est de 3 rangs : 1 mm = 10<sup>3</sup> µm = 1${NB}000 µm.<br>1${NB}000 ÷ 8 = 125.<br>Il faut <span class="big">125 globules</span>.<br>Contrôle : 125 × 8 = 1${NB}000 µm, soit bien 1 mm.<br>⚠ 125${NB}000, c'est le nombre de globules pour 1 mètre, pas 1 millimètre.<br>⚠ 12${NB}500 suppose 1 mm = 100${NB}000 µm : deux rangs de trop.`,
      consigne: "Combien de globules de 8 µm faut-il aligner sur 1 mm ?",
      verification: { type: "qcm", choix: ["12 500", "125", "125 000"], bonne: 1 },
      dessin: microscope(),
    },
    {
      tag: "Énigme 2 · Au musée des sciences",
      titre: "Les étiquettes tombées",
      question: `Une vitrine du musée range les objets par taille.<br>Trois étiquettes sont tombées : <b>10<sup>−2</sup> m</b>, <b>10<sup>0</sup> m</b> et <b>10<sup>1</sup> m</b>.<br>Elles vont sous une coccinelle, un vélo et une baleine bleue.<br><br>Quelle étiquette va sous le <b>vélo</b> ?`,
      reponse: `On cherche la puissance de dix la plus proche de chaque taille.<br>Une coccinelle : environ 7 mm, soit 0,007 m. Proche de 0,01 m = 10<sup>−2</sup> m.<br>Un vélo : environ 1,7 m. Proche de 1 m.<br>Une baleine bleue : environ 25 m. Proche de 10 m = 10<sup>1</sup> m.<br>Or 10<sup>0</sup> = 1.<br>Sous le vélo : <span class="big">10<sup>0</sup> m</span>.<br>⚠ 10<sup>0</sup> ne vaut pas 0 : c'est 1, comme 1 mètre.`,
      consigne: "Quelle étiquette va sous le vélo ?",
      verification: { type: "qcm", choix: ["10⁻² m", "10¹ m", "10⁰ m"], bonne: 2 },
      dessin: vitrine(),
    },
    {
      tag: "Énigme 3 · Chez le médecin",
      titre: "Le cœur de Maëlle",
      question: `Le médecin écoute le cœur de Maëlle.<br>Il bat <b>70 fois par minute</b>.<br>Sans poser d'opération, estime le nombre de battements en <b>une journée</b>.<br><br>Environ combien de battements ?`,
      reponse: `Une heure : 70 × 60, c'est environ 4${NB}000 battements.<br>Une journée dure 24 h, presque 25 h.<br>4${NB}000 × 25 = 100${NB}000.<br>Environ <span class="big">100${NB}000 battements</span>, soit de l'ordre de 10<sup>5</sup>.<br>Contrôle exact : 70 × 60 × 24 = 100${NB}800. L'estimation est très proche.<br>⚠ 10${NB}000 battements, c'est à peine deux heures et demie.<br>⚠ 1${NB}000${NB}000, ce serait presque dix jours.`,
      consigne: "Environ combien de fois le cœur de Maëlle bat-il en une journée ?",
      verification: { type: "qcm", choix: ["environ 100 000", "environ 10 000", "environ 1 000 000"], bonne: 0 },
      dessin: coeur(),
    },
    {
      tag: "Énigme 4 · À la boulangerie",
      titre: "La farine de l'apprenti",
      question: `Le boulanger prépare <b>240 baguettes</b>.<br>Chaque baguette demande <b>160 g</b> de farine.<br>Son apprenti annonce : « Il faut 3${NB}840 kg de farine. »<br><br>Ce résultat est-il vraisemblable ?`,
      reponse: `On estime sans refaire le calcul exact.<br>240 est proche de 250. Et 250 × 160 = 40${NB}000 g, soit 40 kg.<br>3${NB}840 kg, c'est près de 4 tonnes : le poids de trois voitures !<br>C'est environ 100 fois trop.<br>Il faut environ <span class="big">40 kg</span> de farine.<br>Calcul exact : 240 × 160 = 38${NB}400 g = 38,4 kg.<br>L'apprenti a divisé par 10 au lieu de diviser par 1${NB}000.`,
      consigne: "Que penser des 3 840 kg de farine annoncés ?",
      verification: { type: "qcm", choix: ["Oui, 3 840 kg est juste", "Non, il faut environ 4 kg", "Non, il faut environ 40 kg"], bonne: 2 },
      dessin: boulangerie(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le seau de sable",
      sorte: "piege",
      question: `Sur la plage, Léo remplit un seau de 8 L de sable.<br>8 L = 8${NB}000 cm³, soit environ <b>10<sup>4</sup> cm³</b>.<br>Un centimètre cube contient environ <b>10<sup>4</sup> grains</b>.<br>Léo écrit : « 10<sup>4</sup> × 10<sup>4</sup> = 10<sup>16</sup> grains. »<br><br><b>Quel est le bon ordre de grandeur ?</b>`,
      reponse: `Léo s'est trompé ! Il a multiplié les exposants : 4 × 4 = 16.<br>Pour multiplier des puissances de dix, on ajoute les exposants.<br>10<sup>4</sup> × 10<sup>4</sup> = 10<sup>4 + 4</sup> = 10<sup>8</sup>.<br>Le seau contient environ <span class="big">10<sup>8</sup> grains</span>, cent millions.<br>Contrôle : 10${NB}000 × 10${NB}000 = 100${NB}000${NB}000, un 1 suivi de 8 zéros.<br>Plus précis : 8${NB}000 × 10${NB}000 = 80 millions, bien proche de 10<sup>8</sup>.`,
      consigne: "Quel est l'ordre de grandeur du nombre de grains du seau ?",
      verification: { type: "qcm", choix: ["10⁸ grains", "10¹⁶ grains", "10⁴ grains"], bonne: 0 },
      dessin: sable(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'Everest en papier",
      sorte: "defi",
      question: `Une ramette de <b>500 feuilles</b> fait <b>5 cm</b> d'épaisseur.<br>Le mont Everest culmine à <b>8${NB}849 m</b>.<br>On empile des feuilles jusqu'à atteindre son sommet.<br><br>Environ combien de feuilles faut-il ? Réponds en millions.`,
      reponse: `Une feuille : 5 cm ÷ 500 = 0,01 cm = 0,1 mm.<br>En mètres : 0,1 mm = 0,0001 m = 10<sup>−4</sup> m.<br>L'Everest : 8${NB}849 m, environ 9${NB}000 m = 9 × 10<sup>3</sup> m.<br>Diviser, c'est soustraire les exposants : 3 − (−4) = 7.<br>9 × 10<sup>3</sup> ÷ 10<sup>−4</sup> = 9 × 10<sup>7</sup>.<br>Il faut environ <span class="big">90 millions de feuilles</span>.<br>Calcul exact : 8${NB}849 ÷ 0,0001 = 88${NB}490${NB}000, bien proche.`,
      consigne: "Environ combien de feuilles faut-il empiler, en millions ?",
      verification: { type: "courte", attendus: ["90", "88", "88,5", "88,49", "89"], unite: "millions" },
      dessin: everest(),
    },
  ],
};

export default problemes;
