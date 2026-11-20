// Énigmes à projeter — 6e, notion decimal_calcul (additionner en alignant les
// virgules, multiplier un décimal par un entier, × 0,01, diviser par un entier,
// le piège de l'addition mal alignée, le défi de la virgule par l'ordre de
// grandeur). 20/11/2026.
// On reste dans la fiche 6e (lib/fiches/maths-6e-decimal-calcul.tsx) : pas de
// division par un décimal. Phrases courtes (les 6e lisent difficilement).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Le panier : 1,25 kg de carottes et 0,8 kg de pommes (pas une figure).
const marche = () => `<svg viewBox="0 0 480 420" role="img" aria-label="1,25 kilogramme de carottes plus 0,8 kilogramme de pommes">
  <text x="130" y="180" font-size="70" text-anchor="middle">🥕</text>
  <text x="130" y="250" fill="${C.bleu}" font-size="28" text-anchor="middle">1,25 kg</text>
  <text x="240" y="200" fill="${C.craie}" font-size="44" text-anchor="middle">+</text>
  <text x="350" y="180" font-size="70" text-anchor="middle">🍎</text>
  <text x="350" y="250" fill="${C.bleu}" font-size="28" text-anchor="middle">0,8 kg</text>
  <text x="240" y="340" fill="${C.rose}" font-size="26" text-anchor="middle">Masse totale${NB}?</text>
  </svg>`;

// Les 4 bandes de 2,35 m bout à bout : 9,4 m = 400 px, donc 100 px par bande.
const theatre = () => {
  let s = "";
  for (let i = 0; i < 4; i++) {
    const x = 40 + 100 * i;
    s += `<rect x="${x}" y="170" width="100" height="50" fill="${i % 2 ? C.rose : C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>`;
    s += `<text x="${x + 50}" y="203" fill="${C.craie}" font-size="20" text-anchor="middle">2,35 m</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Quatre bandes de tissu de 2,35 mètres collées bout à bout">
  <text x="240" y="90" font-size="50" text-anchor="middle">🎭</text>
  ${s}
  <path d="M40 245 L40 260 L440 260 L440 245" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <text x="240" y="300" fill="${C.bleu}" font-size="26" text-anchor="middle">${NB}? m</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">La longueur totale${NB}?</text>
  </svg>`;
};

// Le vrai bateau et sa maquette : 100 fois plus petite, impossible à l'échelle.
const maquette = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un grand bateau de 45 mètres et sa petite maquette, pas à l'échelle">
  <text x="150" y="230" font-size="120" text-anchor="middle">🚢</text>
  <text x="150" y="290" fill="${C.bleu}" font-size="28" text-anchor="middle">45 m</text>
  <text x="370" y="215" font-size="34" text-anchor="middle">🚢</text>
  <text x="370" y="290" fill="${C.rose}" font-size="28" text-anchor="middle">${NB}? m</text>
  <text x="240" y="350" fill="${C.craie}" font-size="24" text-anchor="middle">maquette 100 fois plus petite</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  </svg>`;

// Le foin partagé entre 3 chevaux (pas une figure).
const ecurie = () => `<svg viewBox="0 0 480 420" role="img" aria-label="13,5 kilogrammes de foin à partager entre trois chevaux">
  <text x="240" y="100" font-size="60" text-anchor="middle">🌾</text>
  <text x="240" y="160" fill="${C.bleu}" font-size="28" text-anchor="middle">13,5 kg de foin</text>
  <text x="110" y="270" font-size="60" text-anchor="middle">🐴</text>
  <text x="240" y="270" font-size="60" text-anchor="middle">🐴</text>
  <text x="370" y="270" font-size="60" text-anchor="middle">🐴</text>
  <text x="110" y="320" fill="${C.rose}" font-size="26" text-anchor="middle">${NB}? kg</text>
  <text x="240" y="320" fill="${C.rose}" font-size="26" text-anchor="middle">${NB}? kg</text>
  <text x="370" y="320" fill="${C.rose}" font-size="26" text-anchor="middle">${NB}? kg</text>
  <text x="240" y="385" fill="${C.pale}" font-size="22" text-anchor="middle">3 parts égales</text>
  </svg>`;

// L'addition d'Arthur, chiffres alignés à droite (la faute) : 12 au-dessus de 3,5.
const aquarium = () => `<svg viewBox="0 0 480 420" role="img" aria-label="L'addition posée par Arthur : 12 plus 3,5 égale 4,7, les chiffres alignés à droite">
  <text x="240" y="55" fill="${C.craie}" font-size="24" text-anchor="middle">🐠 Le calcul d'Arthur</text>
  <text x="210" y="140" fill="${C.craie}" font-size="44" text-anchor="middle">1</text>
  <text x="270" y="140" fill="${C.craie}" font-size="44" text-anchor="middle">2</text>
  <text x="150" y="205" fill="${C.craie}" font-size="44" text-anchor="middle">+</text>
  <text x="210" y="205" fill="${C.craie}" font-size="44" text-anchor="middle">3</text>
  <text x="240" y="205" fill="${C.craie}" font-size="44" text-anchor="middle">,</text>
  <text x="270" y="205" fill="${C.craie}" font-size="44" text-anchor="middle">5</text>
  <path d="M130 225 L300 225" stroke="${C.craie}" stroke-width="3"/>
  <text x="210" y="280" fill="${C.rose}" font-size="44" text-anchor="middle">4</text>
  <text x="240" y="280" fill="${C.rose}" font-size="44" text-anchor="middle">,</text>
  <text x="270" y="280" fill="${C.rose}" font-size="44" text-anchor="middle">7</text>
  <text x="320" y="280" fill="${C.rose}" font-size="32">L</text>
  <text x="240" y="370" fill="${C.rose}" font-size="26" text-anchor="middle">Où est l'erreur${NB}?</text>
  </svg>`;

// La calculatrice sans virgule (pas une figure).
const calculatrice = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une calculatrice qui affiche 1288 pour 2,8 fois 4,6, sans virgule">
  <text x="240" y="50" fill="${C.craie}" font-size="22" text-anchor="middle">1 m de guirlande pèse 4,6 g</text>
  <text x="240" y="90" fill="${C.craie}" font-size="22" text-anchor="middle">Yanis coupe 2,8 m 🎄</text>
  <rect x="120" y="120" width="240" height="200" rx="18" fill="${C.pale}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <rect x="140" y="140" width="200" height="70" rx="8" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>
  <text x="325" y="192" fill="${C.craie}" font-size="44" text-anchor="end">1288</text>
  <text x="240" y="255" fill="${C.craie}" font-size="26" text-anchor="middle">2,8 × 4,6</text>
  <text x="240" y="297" fill="${C.pale}" font-size="20" text-anchor="middle">touche virgule cassée</text>
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Où va la virgule${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "decimal_calcul",
  titre: "Énigmes sur le calcul avec les décimaux",
  description: "Le panier du marché, le décor du théâtre, la maquette de bateau, le foin des chevaux, le piège de l'aquarium, le défi de la calculatrice sans virgule.",
  problemes: [
    {
      tag: "Énigme 1 · Au marché",
      titre: "Le panier de Malik",
      question: `Malik achète <b>1,25 kg</b> de carottes.<br>Il achète aussi <b>0,8 kg</b> de pommes.<br><br>Combien pèsent ses fruits et légumes <b>en tout</b> ?`,
      reponse: `On pose l'addition : <b>virgule sous virgule</b>.<br>0,8 = 0,80 : on ajoute un zéro.<br>1,25 + 0,80 = 2,05.<br>Ordre de grandeur : 1 + 1 = 2. C'est cohérent.<br>Attention : ce n'est pas 1,33.<br>En tout : <span class="big">2,05 kg</span>.`,
      consigne: "Combien font 1,25 kg + 0,8 kg ?",
      verification: { type: "courte", attendus: ["2,05"], unite: "kg" },
      dessin: marche(),
    },
    {
      tag: "Énigme 2 · Au théâtre",
      titre: "Le décor de la pièce",
      question: `Pour le décor, Inès colle <b>4 bandes</b> de tissu bout à bout.<br>Chaque bande mesure <b>2,35 m</b>.<br><br>Quelle est la <b>longueur</b> totale ?`,
      reponse: `4 bandes de 2,35 m : on calcule 2,35 × 4.<br>2 × 4 = 8.<br>0,35 × 4 = 1,40.<br>8 + 1,40 = 9,40.<br>On vérifie : 2,35 + 2,35 = 4,70, puis 4,70 + 4,70 = 9,40.<br>La longueur totale est <span class="big">9,4 m</span>.`,
      consigne: "Combien font 2,35 × 4 ?",
      verification: { type: "courte", attendus: ["9,4", "9,40"], unite: "m" },
      dessin: theatre(),
    },
    {
      tag: "Énigme 3 · Au club de maquettes",
      titre: "Le bateau miniature",
      question: `Un vrai bateau mesure <b>45 m</b> de long.<br>Tom construit sa maquette, <b>100 fois plus petite</b>.<br>Pour la calculer, il fait 45 × 0,01.<br><br>Combien mesure la <b>maquette</b> ?`,
      reponse: `× 0,01, c'est ÷ 100.<br>45 ÷ 100 = 0,45.<br>Les chiffres glissent de deux rangs vers la droite.<br>0,45 m, c'est 45 cm : la maquette tient sur une étagère.<br>La maquette mesure <span class="big">0,45 m</span>.`,
      consigne: "Combien font 45 × 0,01 ?",
      verification: { type: "qcm", choix: ["4,5 m", "0,45 m", "4 500 m"], bonne: 1 },
      dessin: maquette(),
    },
    {
      tag: "Énigme 4 · À l'écurie",
      titre: "Le foin des chevaux",
      question: `Ce matin, Clara a <b>13,5 kg</b> de foin.<br>Elle le partage entre <b>3 chevaux</b>.<br>Chacun reçoit la même masse.<br><br>Combien de foin reçoit <b>chaque cheval</b> ?`,
      reponse: `On partage en 3 : 13,5 ÷ 3.<br>13 ÷ 3 = 4, il reste 1 unité.<br>1 unité = 10 dixièmes. Avec les 5 dixièmes : 15 dixièmes.<br>15 dixièmes ÷ 3 = 5 dixièmes. Donc 13,5 ÷ 3 = 4,5.<br>On vérifie : 4,5 × 3 = 13,5.<br>Chaque cheval reçoit <span class="big">4,5 kg</span>.`,
      consigne: "Combien font 13,5 ÷ 3 ?",
      verification: { type: "courte", attendus: ["4,5"], unite: "kg" },
      dessin: ecurie(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'eau de l'aquarium",
      sorte: "piege",
      question: `L'aquarium d'Arthur contient <b>12 L</b> d'eau.<br>Il ajoute <b>3,5 L</b>.<br>Arthur pose : 12 + 3,5 = 4,7 L.<br><br><b>Où est l'erreur ?</b>`,
      reponse: `Arthur a aligné les chiffres à droite, comme pour des entiers.<br>Il a mis le 2 sous le 5 : il a lu 12 comme 1,2 !<br>Il faut aligner <b>virgule sous virgule</b>. 12 = 12,0.<br>12,0 + 3,5 = 15,5.<br>Bon sens : on ajoute de l'eau, donc plus de 12 L.<br>L'aquarium contient <span class="big">15,5 L</span>.`,
      consigne: "Combien font 12 + 3,5 ?",
      verification: { type: "qcm", choix: ["15,5 L", "4,7 L", "12,35 L"], bonne: 0 },
      dessin: aquarium(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La calculatrice sans virgule",
      sorte: "defi",
      question: `Un mètre de guirlande pèse <b>4,6 g</b>.<br>Yanis en coupe <b>2,8 m</b>.<br>Sa calculatrice a la touche virgule cassée.<br>Pour 2,8 × 4,6, elle affiche <b>1288</b>.<br><br>Combien pèse la guirlande ?`,
      reponse: `Ordre de grandeur : 2,8 ≈ 3 et 4,6 ≈ 5.<br>3 × 5 = 15. Le résultat est proche de 15.<br>128,8 ? Trop grand. 1,288 ? Trop petit.<br>La virgule va après 12 : 12,88.<br>Preuve : 2,8 × 4 = 11,2 et 2,8 × 0,6 = 1,68. 11,2 + 1,68 = 12,88.<br>La guirlande pèse <span class="big">12,88 g</span>.`,
      consigne: "La calculatrice affiche 1288 pour 2,8 × 4,6. Quel est le bon résultat ?",
      verification: { type: "qcm", choix: ["128,8 g", "1,288 g", "12,88 g"], bonne: 2 },
      dessin: calculatrice(),
    },
  ],
};

export default problemes;
