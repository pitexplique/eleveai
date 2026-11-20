// Énigmes à projeter — 6e, notion aire_perimetre (comprendre le périmètre,
// carré, rectangle, figure, problème, défi). 20/11/2026.
// Phrases courtes (les 6e lisent difficilement). Pas de cercle : le disque est
// la notion cercle_disque (cf. lib/fiches/maths-6e-perimetres.tsx).
// ⛔ Toutes les figures sont AU BON RAPPORT (échelle notée au-dessus de chacune).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Coussin triangle rectangle 30 / 40 / 50 cm : 1 cm = 6 px.
// Angle droit en (110, 320) ; 40 cm → 240 px, 30 cm → 180 px, 50 cm → 300 px.
const coussin = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un coussin en triangle de côtés 30 cm, 40 cm et 50 cm">
  <path d="M110 320 L350 320 L110 140 Z" fill="${C.jaune}" fill-opacity=".18" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M110 320 L350 320 L110 140 Z" fill="none" stroke="${C.rose}" stroke-width="3" stroke-dasharray="8 8"/>
  <path d="M110 298 L132 298 L132 320" fill="none" stroke="${C.craie}" stroke-width="2"/>
  <text x="230" y="356" fill="${C.craie}" font-size="26" text-anchor="middle">40 cm</text>
  <text x="98" y="238" fill="${C.craie}" font-size="26" text-anchor="end">30 cm</text>
  <text x="256" y="206" fill="${C.craie}" font-size="26">50 cm</text>
  <text x="240" y="66" fill="${C.pale}" font-size="22" text-anchor="middle">le galon fait tout le tour</text>
  <text x="240" y="400" fill="${C.rose}" font-size="28" text-anchor="middle">galon${NB}: ? cm</text>
  </svg>`;

// Plateau de jeu carré de 42 cm, 8 × 8 cases de 30 px (240 px).
const plateau = () => {
  let s = "";
  for (let c = 0; c < 8; c++)
    for (let r = 0; r < 8; r++)
      if ((c + r) % 2 === 1)
        s += `<rect x="${120 + c * 30}" y="${70 + r * 30}" width="30" height="30" fill="${C.craie}" fill-opacity=".28"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un plateau de jeu carré de 42 cm de côté">
  ${s}
  <rect x="120" y="70" width="240" height="240" fill="none" stroke="${C.bleu}" stroke-width="6"/>
  <text x="240" y="346" fill="${C.craie}" font-size="26" text-anchor="middle">42 cm</text>
  <text x="240" y="398" fill="${C.rose}" font-size="28" text-anchor="middle">la bande bleue${NB}: ? cm</text>
  </svg>`;
};

// Terrain de handball 40 m × 20 m : 1 m = 8 px → 320 × 160.
const terrain = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un terrain rectangulaire de 40 m sur 20 m">
  <rect x="80" y="120" width="320" height="160" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>
  <path d="M240 120 L240 280" stroke="${C.craie}" stroke-width="2"/>
  <path d="M80 152 A 48 48 0 0 1 80 248 M400 152 A 48 48 0 0 0 400 248" fill="none" stroke="${C.craie}" stroke-width="2"/>
  <rect x="72" y="188" width="8" height="24" fill="${C.jaune}"/>
  <rect x="400" y="188" width="8" height="24" fill="${C.jaune}"/>
  <text x="240" y="106" fill="${C.craie}" font-size="26" text-anchor="middle">40 m</text>
  <text x="70" y="209" fill="${C.craie}" font-size="26" text-anchor="end">20 m</text>
  <text x="420" y="110" font-size="34" text-anchor="middle">🏃</text>
  <text x="240" y="340" fill="${C.pale}" font-size="22" text-anchor="middle">on court sur les lignes du bord</text>
  <text x="240" y="390" fill="${C.rose}" font-size="28" text-anchor="middle">1 tour${NB}= ? m</text>
  </svg>`;

// Plan de travail en L : 1 m = 80 px. Sommets (en m) : (0,0) (4,0) (4,1) (1,1) (1,3) (0,3).
const cuisine = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un plan de travail en forme de L, avec la longueur de ses six côtés">
  <path d="M80 80 L400 80 L400 160 L160 160 L160 320 L80 320 Z" fill="${C.jaune}" fill-opacity=".18" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <text x="240" y="68" fill="${C.craie}" font-size="24" text-anchor="middle">4 m</text>
  <text x="410" y="129" fill="${C.craie}" font-size="24">1 m</text>
  <text x="280" y="190" fill="${C.craie}" font-size="24" text-anchor="middle">3 m</text>
  <text x="172" y="248" fill="${C.craie}" font-size="24">2 m</text>
  <text x="120" y="350" fill="${C.craie}" font-size="24" text-anchor="middle">1 m</text>
  <text x="70" y="208" fill="${C.craie}" font-size="24" text-anchor="end">3 m</text>
  <text x="330" y="290" fill="${C.rose}" font-size="28" text-anchor="middle">baguette${NB}: ? m</text>
  </svg>`;

// Carte postale 15 cm × 10 cm : 1 cm = 18 px → 270 × 180.
const carte = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une carte postale de 15 cm sur 10 cm, et le calcul de Hugo">
  <rect x="105" y="90" width="270" height="180" rx="4" fill="${C.bleu}" fill-opacity=".1" stroke="${C.craie}" stroke-width="4"/>
  <rect x="315" y="105" width="44" height="52" fill="${C.rose}" fill-opacity=".25" stroke="${C.rose}" stroke-width="2"/>
  <path d="M240 110 L240 250 M255 190 L355 190 M255 215 L355 215 M255 240 L355 240" stroke="${C.pale}" stroke-width="2"/>
  <text x="240" y="78" fill="${C.craie}" font-size="24" text-anchor="middle">15 cm</text>
  <text x="95" y="188" fill="${C.craie}" font-size="24" text-anchor="end">10 cm</text>
  <text x="240" y="320" fill="${C.pale}" font-size="24" text-anchor="middle">Hugo${NB}: 15 + 10 = 25 cm de ruban</text>
  <text x="240" y="380" fill="${C.rose}" font-size="34" text-anchor="middle">Vrai ou faux${NB}?</text>
  </svg>`;

// Scène 9 m × 6 m : 1 m = 30 px → 270 × 180 (la largeur reste « ? »).
const scene = () => {
  let l = "";
  for (let x = 105; x <= 375; x += 30) l += `<circle cx="${x}" cy="110" r="6" fill="${C.jaune}"/><circle cx="${x}" cy="290" r="6" fill="${C.jaune}"/>`;
  for (let y = 140; y <= 260; y += 30) l += `<circle cx="105" cy="${y}" r="6" fill="${C.jaune}"/><circle cx="375" cy="${y}" r="6" fill="${C.jaune}"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une scène rectangulaire de 9 m de long entourée d'une guirlande de 30 m">
  <rect x="105" y="110" width="270" height="180" fill="${C.bleu}" fill-opacity=".1" stroke="${C.craie}" stroke-width="3"/>
  ${l}
  <text x="240" y="220" font-size="44" text-anchor="middle">🎸 🎤</text>
  <text x="240" y="92" fill="${C.craie}" font-size="26" text-anchor="middle">9 m</text>
  <text x="90" y="210" fill="${C.rose}" font-size="28" text-anchor="end">? m</text>
  <text x="240" y="345" fill="${C.jaune}" font-size="26" text-anchor="middle">guirlande${NB}: 30 m en tout</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "aire_perimetre",
  titre: "Énigmes sur les périmètres",
  description: "Le coussin à border, le plateau de jeu, le tour du terrain, le plan de travail en L, le piège de la carte postale, la guirlande de la scène.",
  problemes: [
    {
      tag: "Énigme 1 · En couture",
      titre: "Le coussin à border",
      question: `Léa coud un coussin en <b>triangle</b>.<br>Ses côtés mesurent <b>30 cm</b>, <b>40 cm</b> et <b>50 cm</b>.<br>Elle coud un galon <b>tout autour</b>.<br><br>Quelle <b>longueur de galon</b> lui faut-il ?`,
      reponse: `Faire tout le tour, c'est mettre les côtés bout à bout.<br>30 + 40 + 50 = 120.<br>Il lui faut <span class="big">120 cm de galon</span>, soit 1,20 m.<br>Cette longueur, c'est le <b>périmètre</b> du coussin.`,
      consigne: "Quelle longueur de galon faut-il pour faire le tour du coussin ?",
      verification: { type: "courte", attendus: ["120"], unite: "cm" },
      dessin: coussin(),
    },
    {
      tag: "Énigme 2 · Jeux de société",
      titre: "Le plateau de jeu",
      question: `Le plateau de jeu de Malo est un <b>carré</b>.<br>Son côté mesure <b>42 cm</b>.<br>Il colle une bande bleue <b>tout autour</b>.<br><br>Quelle est la <b>longueur de la bande</b> ?`,
      reponse: `Un carré a 4 côtés égaux.<br>P = 4 × côté = 4 × 42.<br>4 × 40 = 160 et 4 × 2 = 8. 160 + 8 = 168.<br>La bande mesure <span class="big">168 cm</span>.`,
      consigne: "Quelle est la longueur de la bande collée autour du plateau ?",
      verification: { type: "qcm", choix: ["168 cm", "84 cm", "1 764 cm"], bonne: 0 },
      dessin: plateau(),
    },
    {
      tag: "Énigme 3 · Au gymnase",
      titre: "Le tour du terrain",
      question: `Le terrain de handball est un <b>rectangle</b>.<br>Il mesure <b>40 m</b> de long et <b>20 m</b> de large.<br>Nour court une fois <b>tout autour</b>.<br><br><b>Combien de mètres</b> court-elle ?`,
      reponse: `Un rectangle a 2 longueurs et 2 largeurs.<br>P = 2 × (40 + 20) = 2 × 60 = 120.<br>Autre façon : 40 + 20 + 40 + 20 = 120.<br>Nour court <span class="big">120 m</span>.`,
      consigne: "Combien de mètres Nour court-elle pour faire un tour du terrain ?",
      verification: { type: "courte", attendus: ["120"], unite: "m" },
      dessin: terrain(),
    },
    {
      tag: "Énigme 4 · Dans la cuisine",
      titre: "Le plan de travail en L",
      question: `Le plan de travail de la cuisine a la forme d'un <b>L</b>.<br>Ses 6 côtés sont écrits sur le dessin.<br>On pose une baguette sur <b>tout le bord</b>.<br><br>Quelle est la <b>longueur de la baguette</b> ?`,
      reponse: `Pas de formule : j'additionne les 6 côtés du tour.<br>4 + 1 + 3 + 2 + 1 + 3 = 14.<br>La baguette mesure <span class="big">14 m</span>.<br>Je vérifie : je compte chaque côté une seule fois.`,
      consigne: "Quelle est la longueur de la baguette posée sur tout le bord du plan de travail ?",
      verification: { type: "courte", attendus: ["14"], unite: "m" },
      dessin: cuisine(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le ruban de Hugo",
      sorte: "piege",
      question: `Hugo veut un ruban autour d'une carte postale.<br>La carte mesure <b>15 cm</b> sur <b>10 cm</b>.<br>Il calcule : <b>15 + 10 = 25 cm</b>.<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Hugo n'a compté que <b>2 côtés</b> sur 4.<br>Le tour, c'est 15 + 10 + 15 + 10.<br>P = 2 × (15 + 10) = 2 × 25 = <span class="big">50 cm</span>.<br>Et 15 × 10 = 150, c'est l'<b>aire</b> (en cm²), pas le tour.`,
      consigne: "Quelle longueur de ruban faut-il pour faire le tour de la carte ?",
      verification: { type: "qcm", choix: ["25 cm", "150 cm", "50 cm"], bonne: 2 },
      dessin: carte(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La guirlande de la scène",
      sorte: "defi",
      question: `Pour le concert, une guirlande fait le tour de la scène.<br>La scène est un <b>rectangle</b> de <b>9 m</b> de long.<br>La guirlande mesure <b>30 m</b>, juste le tour.<br><br>Quelle est la <b>largeur</b> de la scène ?`,
      reponse: `Le tour, c'est 2 longueurs et 2 largeurs.<br>La moitié du tour : 30 ÷ 2 = 15 m. C'est 1 longueur + 1 largeur.<br>15 − 9 = 6. La largeur est <span class="big">6 m</span>.<br>Je vérifie : 2 × (9 + 6) = 2 × 15 = 30 m.`,
      consigne: "Quelle est la largeur de la scène, en mètres ?",
      verification: { type: "courte", attendus: ["6"], unite: "m" },
      dessin: scene(),
    },
  ],
};

export default problemes;
