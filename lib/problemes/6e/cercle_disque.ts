// Énigmes à projeter — 6e, notion cercle_disque (rayon et diamètre, le disque
// comme zone à moins d'une distance, le tour proportionnel au diamètre, le
// périmètre avec π ≈ 3,14, le piège du rayon pris pour le diamètre, le défi de
// la roue de trottinette). 20/11/2026.
// ⛔ Pas d'aire du disque : la fiche 6e (lib/fiches/maths-6e-cercle-disque.tsx)
// n'enseigne que P = π × d et P = 2 × π × r, avec π ≈ 3,14.
// Phrases courtes (les 6e lisent difficilement). Dessins au bon rapport
// (échelle notée dans chaque fonction).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// La piste du cirque : un cercle de diamètre 13 m (280 px).
const cirque = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une piste de cirque ronde ; un diamètre de 13 mètres passe par le centre">
  <circle cx="240" cy="190" r="140" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <path d="M100 190 L380 190" stroke="${C.rose}" stroke-width="4" stroke-dasharray="12 8"/>
  <circle cx="240" cy="190" r="6" fill="${C.craie}"/>
  <text x="240" y="225" fill="${C.pale}" font-size="20" text-anchor="middle">centre</text>
  <text x="240" y="172" fill="${C.bleu}" font-size="26" text-anchor="middle">13 m</text>
  <text x="240" y="300" font-size="50" text-anchor="middle">🤡</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">Le rayon de la piste${NB}?</text>
  </svg>`;

// Le phare et trois bateaux : 50 px pour 1 km, distances mesurées depuis la lumière (70 ; 210).
// C : 7 km à 0° → (420 ; 210). B : 5 km à 30° vers le haut → (286,5 ; 85). A : 3 km à 35° vers le bas → (192,9 ; 296).
const phare = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un phare et trois bateaux : A à 3 kilomètres, B à 5 kilomètres, C à 7 kilomètres">
  <text x="240" y="40" fill="${C.craie}" font-size="24" text-anchor="middle">Le phare éclaire jusqu'à 5 km</text>
  <path d="M60 300 L80 300 L75 222 L65 222 Z" fill="${C.craie}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <circle cx="70" cy="210" r="10" fill="${C.jaune}"/>
  <path d="M70 210 L420 210" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>
  <path d="M70 210 L286.5 85" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>
  <path d="M70 210 L192.9 296" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>
  <text x="420" y="222" font-size="36" text-anchor="middle">⛵</text>
  <text x="286.5" y="97" font-size="36" text-anchor="middle">⛵</text>
  <text x="192.9" y="308" font-size="36" text-anchor="middle">⛵</text>
  <text x="420" y="180" fill="${C.craie}" font-size="26" text-anchor="middle">C</text>
  <text x="312" y="95" fill="${C.craie}" font-size="26">B</text>
  <text x="218" y="306" fill="${C.craie}" font-size="26">A</text>
  <text x="300" y="245" fill="${C.bleu}" font-size="22" text-anchor="middle">7 km</text>
  <text x="165" y="135" fill="${C.bleu}" font-size="22" text-anchor="end">5 km</text>
  <text x="150" y="250" fill="${C.bleu}" font-size="22">3 km</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Quels bateaux sont éclairés${NB}?</text>
  </svg>`;

// L'assiette (diamètre 15 cm) et le plat (diamètre 30 cm) : 6 px pour 1 cm.
const poterie = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une assiette de 15 centimètres de diamètre et un plat de 30 centimètres de diamètre">
  <circle cx="110" cy="180" r="45" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <path d="M65 180 L155 180" stroke="${C.rose}" stroke-width="3"/>
  <text x="110" y="122" fill="${C.bleu}" font-size="24" text-anchor="middle">15 cm</text>
  <circle cx="330" cy="180" r="90" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>
  <path d="M240 180 L420 180" stroke="${C.rose}" stroke-width="3"/>
  <text x="330" y="78" fill="${C.bleu}" font-size="24" text-anchor="middle">30 cm</text>
  <text x="110" y="305" fill="${C.craie}" font-size="22" text-anchor="middle">tour 47,1 cm</text>
  <text x="330" y="305" fill="${C.rose}" font-size="22" text-anchor="middle">tour${NB}?</text>
  <text x="110" y="345" fill="${C.pale}" font-size="20" text-anchor="middle">l'assiette</text>
  <text x="330" y="345" fill="${C.pale}" font-size="20" text-anchor="middle">le plat</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">diamètres dessinés en rose</text>
  </svg>`;

// Le bassin des manchots : rayon 6 m, 22 px pour 1 m (132 px).
const bassin = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un bassin rond de 6 mètres de rayon, entouré d'une clôture">
  <text x="30" y="40" fill="${C.pale}" font-size="22">π ≈ 3,14</text>
  <circle cx="240" cy="195" r="132" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="5" stroke-dasharray="14 6"/>
  <circle cx="240" cy="195" r="5" fill="${C.craie}"/>
  <path d="M240 195 L372 195" stroke="${C.rose}" stroke-width="4"/>
  <text x="306" y="183" fill="${C.bleu}" font-size="26" text-anchor="middle">6 m</text>
  <text x="200" y="260" font-size="50" text-anchor="middle">🐧</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">Longueur de la clôture${NB}?</text>
  </svg>`;

// Le trampoline : rayon 2 m, 65 px pour 1 m (130 px).
const trampoline = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un trampoline rond de 2 mètres de rayon">
  <circle cx="240" cy="185" r="130" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <circle cx="240" cy="185" r="5" fill="${C.craie}"/>
  <path d="M240 185 L370 185" stroke="${C.rose}" stroke-width="4"/>
  <text x="305" y="173" fill="${C.bleu}" font-size="26" text-anchor="middle">2 m</text>
  <text x="210" y="260" font-size="50" text-anchor="middle">🤸</text>
  <text x="240" y="360" fill="${C.craie}" font-size="22" text-anchor="middle">Hugo${NB}: «${NB}3,14 × 2 = 6,28 m${NB}»</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;

// La roue de trottinette : diamètre 20 cm, 6 px pour 1 cm (120 px).
// Un tour déroulé ≈ 62,8 cm ≈ 376,8 px, de x = 90 à x = 466,8.
const trottinette = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une roue de 20 centimètres de diamètre et la longueur d'un tour déroulé sur le sol">
  <text x="240" y="60" fill="${C.craie}" font-size="26" text-anchor="middle">🛴 Zoé roule 314 m</text>
  <circle cx="90" cy="230" r="60" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>
  <path d="M90 170 L90 290" stroke="${C.rose}" stroke-width="3"/>
  <text x="160" y="238" fill="${C.bleu}" font-size="24">20 cm</text>
  <path d="M20 290 L472 290" stroke="${C.craie}" stroke-width="3"/>
  <path d="M90 302 L466.8 302" stroke="${C.jaune}" stroke-width="6"/>
  <path d="M90 294 L90 310 M466.8 294 L466.8 310" stroke="${C.jaune}" stroke-width="4"/>
  <text x="278" y="340" fill="${C.jaune}" font-size="22" text-anchor="middle">1 tour de roue</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de tours${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "cercle_disque",
  titre: "Énigmes sur le cercle et le disque",
  description: "La piste du cirque, le phare dans la nuit, les deux assiettes de la poterie, le bassin des manchots, le piège du trampoline, le défi de la roue de trottinette.",
  problemes: [
    {
      tag: "Énigme 1 · Au cirque",
      titre: "La piste du clown",
      question: `La piste du cirque est un cercle.<br>Le clown la traverse en passant par le <b>centre</b>.<br>Il parcourt <b>13 m</b> d'un bord à l'autre.<br><br>Combien mesure le <b>rayon</b> de la piste ?`,
      reponse: `Le clown passe par le centre : il suit un <b>diamètre</b>.<br>Le diamètre vaut deux rayons.<br>Rayon = diamètre ÷ 2.<br>13 ÷ 2 = 6,5. On vérifie : 6,5 + 6,5 = 13.<br>Le rayon mesure <span class="big">6,5 m</span>.`,
      consigne: "Un cercle a un diamètre de 13 m. Combien mesure son rayon ?",
      verification: { type: "courte", attendus: ["6,5"], unite: "m" },
      dessin: cirque(),
    },
    {
      tag: "Énigme 2 · En mer",
      titre: "Le phare dans la nuit",
      question: `La nuit, un phare éclaire jusqu'à <b>5 km</b> autour de lui.<br>Le bateau A est à 3 km du phare.<br>Le bateau B est à 5 km. Le bateau C est à 7 km.<br><br>Quels bateaux sont <b>éclairés</b> ?`,
      reponse: `La zone éclairée est un <b>disque</b>.<br>Son centre est le phare. Son rayon est 5 km.<br>A : 3 km, c'est moins que 5 km. Il est dans le disque.<br>B : 5 km pile. Il est sur le cercle, au bord : éclairé.<br>C : 7 km, c'est plus que 5 km. Il reste dans le noir.<br>Sont éclairés : <span class="big">A et B</span>.`,
      consigne: "Un phare éclaire jusqu'à 5 km. Les bateaux sont à 3 km, 5 km et 7 km. Lesquels sont éclairés ?",
      verification: { type: "qcm", choix: ["A seulement", "A et B", "A, B et C"], bonne: 1 },
      dessin: phare(),
    },
    {
      tag: "Énigme 3 · À la poterie",
      titre: "Les deux assiettes",
      question: `Rose fabrique une assiette de <b>15 cm</b> de diamètre.<br>Son tour mesure <b>47,1 cm</b>.<br>Puis elle fait un plat de <b>30 cm</b> de diamètre.<br><br>Combien mesure le <b>tour</b> du plat ?`,
      reponse: `Le tour est <b>proportionnel</b> au diamètre.<br>30 cm, c'est 2 fois 15 cm.<br>Donc le tour est 2 fois plus long : 47,1 × 2 = 94,2.<br>On vérifie avec π : 3,14 × 30 = 94,2.<br>Attention : on ne fait pas 47,1 + 15.<br>Le tour du plat mesure <span class="big">94,2 cm</span>.`,
      consigne: "Un disque de 15 cm de diamètre a un tour de 47,1 cm. Quel est le tour d'un disque de 30 cm de diamètre ?",
      verification: { type: "qcm", choix: ["94,2 cm", "62,1 cm", "47,1 cm"], bonne: 0 },
      dessin: poterie(),
    },
    {
      tag: "Énigme 4 · Au zoo",
      titre: "Le bassin des manchots",
      question: `Le bassin des manchots est un disque.<br>Son <b>rayon</b> mesure <b>6 m</b>.<br>On pose une clôture tout autour.<br><br>Quelle est la <b>longueur</b> de la clôture ? Prends π ≈ 3,14.`,
      reponse: `La clôture fait le tour : c'est le <b>périmètre</b>.<br>On double d'abord le rayon : 6 × 2 = 12 m. C'est le diamètre.<br>P = π × d ≈ 3,14 × 12.<br>3,14 × 10 = 31,4 et 3,14 × 2 = 6,28.<br>31,4 + 6,28 = 37,68.<br>La clôture mesure environ <span class="big">37,68 m</span>.`,
      consigne: "Un disque a un rayon de 6 m. Quel est son périmètre, avec π ≈ 3,14 ?",
      verification: { type: "courte", attendus: ["37,68"], unite: "m" },
      dessin: bassin(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le tour du trampoline",
      sorte: "piege",
      question: `Le trampoline d'Hugo est rond.<br>Son <b>rayon</b> mesure <b>2 m</b>.<br>Hugo calcule le tour : 3,14 × 2 = 6,28 m.<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Hugo a multiplié le <b>rayon</b> par π.<br>Or P = π × <b>diamètre</b>.<br>Le diamètre vaut deux rayons : 2 × 2 = 4 m.<br>P ≈ 3,14 × 4 = 12,56.<br>Hugo n'a trouvé que la moitié du tour.<br>Le tour mesure environ <span class="big">12,56 m</span>.`,
      consigne: "Un disque a un rayon de 2 m. Quel est son périmètre, avec π ≈ 3,14 ?",
      verification: { type: "qcm", choix: ["6,28 m", "5,14 m", "12,56 m"], bonne: 2 },
      dessin: trampoline(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La roue de la trottinette",
      sorte: "defi",
      question: `La roue de la trottinette de Zoé mesure <b>20 cm</b> de diamètre.<br>Zoé roule <b>314 m</b> tout droit.<br><br>Combien de <b>tours</b> fait la roue ? Prends π ≈ 3,14.`,
      reponse: `En un tour, la roue avance de son périmètre.<br>P ≈ 3,14 × 20 = 62,8 cm.<br>On met tout en cm : 314 m = 31 400 cm.<br>Astuce : 62,8 × 5 = 314.<br>Donc 62,8 × 500 = 31 400.<br>La roue fait environ <span class="big">500 tours</span>.`,
      consigne: "Une roue de 20 cm de diamètre roule sur 314 m. Combien de tours fait-elle, avec π ≈ 3,14 ?",
      verification: { type: "courte", attendus: ["500"], unite: "tours" },
      dessin: trottinette(),
    },
  ],
};

export default problemes;
