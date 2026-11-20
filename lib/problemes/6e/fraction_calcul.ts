// Énigmes à projeter — 6e, notion fraction_calcul (prendre une fraction d'un
// nombre, soustraire avec le même dénominateur, additionner quand un dénominateur
// est multiple de l'autre, multiplier une fraction par un entier, le piège
// « j'ajoute les bas », le défi de la quantité retrouvée). 20/11/2026.
// On reste dans la fiche 6e (lib/fiches/maths-6e-fraction-calcul.tsx) et on
// évite ses exemples (2/3 de 18, 3/5 de 40, 2/3 + 1/6, 5/4 + 2/3, 3/4 − 1/4).
// Phrases courtes (les 6e lisent difficilement) ; fractions en étage.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

const NB = " ";

// Une barre de 400 px (x de 40 à 440) coupée en n parts égales, les k premières colorées.
const barre = (y: number, n: number, k: number, couleur: string, h = 50) => {
  let s = "";
  const l = 400 / n;
  for (let i = 0; i < n; i++)
    s += `<rect x="${40 + i * l}" y="${y}" width="${l}" height="${h}" fill="${couleur}" fill-opacity="${i < k ? ".45" : ".06"}" stroke="${C.craie}" stroke-width="3"/>`;
  return s;
};

// Les 45 tickets en 5 parts égales, 2 parts prises.
const foraine = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une barre de 45 tickets coupée en 5 parts égales, 2 parts colorées">
  <text x="240" y="70" font-size="50" text-anchor="middle">🎡</text>
  <path d="M40 135 L40 120 L440 120 L440 135" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <text x="240" y="108" fill="${C.bleu}" font-size="26" text-anchor="middle">45 tickets</text>
  ${barre(150, 5, 2, C.jaune, 60)}
  <text x="120" y="250" fill="${C.jaune}" font-size="22" text-anchor="middle">autos</text>
  <text x="120" y="276" fill="${C.jaune}" font-size="22" text-anchor="middle">tamponneuses</text>
  ${svgFrac(330, 270, 2, 5, C.craie, 30)}
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de tickets${NB}?</text>
  </svg>`;

// La pizza : centre (240 ; 175), rayon 125, 8 parts de 45° (125 × cos 45° ≈ 88,4).
const pizzeria = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une pizza coupée en 8 parts égales">
  <circle cx="240" cy="175" r="125" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>
  <path d="M115 175 L365 175 M240 50 L240 300 M151.6 86.6 L328.4 263.4 M328.4 86.6 L151.6 263.4" stroke="${C.craie}" stroke-width="3"/>
  <text x="60" y="345" fill="${C.craie}" font-size="24">Ana</text>
  ${svgFrac(150, 340, 3, 8, C.bleu, 28)}
  <text x="270" y="345" fill="${C.craie}" font-size="24">Léo</text>
  ${svgFrac(360, 340, 2, 8, C.bleu, 28)}
  </svg>`;

// Le pot de peinture : deux barres de même longueur, en quarts puis en huitièmes.
const bricolage = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux barres égales : l'une en 4 parts, 1 colorée ; l'autre en 8 parts, 3 colorées">
  <text x="240" y="60" font-size="44" text-anchor="middle">🖌️</text>
  ${barre(100, 4, 1, C.bleu)}
  <text x="240" y="185" fill="${C.bleu}" font-size="22" text-anchor="middle">la porte</text>
  ${barre(220, 8, 3, C.rose)}
  <text x="240" y="305" fill="${C.rose}" font-size="22" text-anchor="middle">le volet</text>
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Quelle fraction du pot${NB}?</text>
  </svg>`;

// Les 6 cadres de la ruche, chacun avec 3/4 kg de miel.
const ruche = () => {
  let s = "";
  for (let i = 0; i < 6; i++) {
    const x = 40 + (i % 3) * 140;
    const y = 50 + Math.floor(i / 3) * 150;
    s += `<rect x="${x}" y="${y}" width="120" height="120" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>`;
    s += svgFrac(x + 45, y + 55, 3, 4, C.craie, 26);
    s += `<text x="${x + 90}" y="${y + 68}" fill="${C.craie}" font-size="22" text-anchor="middle">kg</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Six cadres de ruche, chacun avec trois quarts de kilogramme de miel">
  ${s}
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">🐝 Combien de miel en tout${NB}?</text>
  </svg>`;
};

// Les deux jus : un verre de 1/4 L, un verre de 2/4 L, et le calcul de Kenza.
const jus = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un quart de litre de jus plus deux quarts de litre de jus ; Kenza trouve trois huitièmes de litre">
  <text x="110" y="110" font-size="60" text-anchor="middle">🍊</text>
  ${svgFrac(110, 175, 1, 4, C.jaune, 30)}
  <text x="110" y="245" fill="${C.jaune}" font-size="22" text-anchor="middle">L</text>
  <text x="240" y="170" fill="${C.craie}" font-size="44" text-anchor="middle">+</text>
  <text x="370" y="110" font-size="60" text-anchor="middle">🥭</text>
  ${svgFrac(370, 175, 2, 4, C.jaune, 30)}
  <text x="370" y="245" fill="${C.jaune}" font-size="22" text-anchor="middle">L</text>
  <text x="185" y="320" fill="${C.craie}" font-size="24" text-anchor="end">Kenza${NB}:</text>
  ${svgFrac(225, 310, 3, 8, C.rose, 30)}
  <text x="255" y="320" fill="${C.rose}" font-size="24">L</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-elle raison${NB}?</text>
  </svg>`;

// Les sièges de l'avion : une barre en 5 parts égales, 3 parts occupées = 120 passagers.
const avion = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une barre de sièges en 5 parts égales : 3 parts occupées font 120 passagers">
  <text x="240" y="70" font-size="50" text-anchor="middle">✈️</text>
  ${barre(150, 5, 3, C.bleu, 60)}
  <path d="M40 225 L40 240 L280 240 L280 225" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <text x="160" y="272" fill="${C.bleu}" font-size="24" text-anchor="middle">120 passagers</text>
  <path d="M40 135 L40 120 L440 120 L440 135" fill="none" stroke="${C.rose}" stroke-width="3"/>
  <text x="240" y="108" fill="${C.rose}" font-size="24" text-anchor="middle">${NB}? sièges</text>
  <text x="360" y="272" fill="${C.pale}" font-size="22" text-anchor="middle">places vides</text>
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de sièges${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "fraction_calcul",
  titre: "Énigmes sur le calcul avec les fractions",
  description: "Les tickets de la fête foraine, la pizza partagée, le pot de peinture, le miel de la ruche, le piège des deux jus, le défi des sièges de l'avion.",
  problemes: [
    {
      tag: "Énigme 1 · À la fête foraine",
      titre: "Les tickets de Tom",
      question: `Tom a <b>45 tickets</b>.<br>Il en utilise les ${frac(2, 5)} aux autos tamponneuses.<br><br><b>Combien de tickets</b> utilise-t-il ?`,
      reponse: `Je divise, puis je multiplie.<br>${frac(1, 5)} de 45 : 45 ÷ 5 = 9 tickets.<br>${frac(2, 5)} de 45 : 2 × 9 = 18 tickets.<br>On vérifie : 5 × 9 = 45.<br>Tom utilise <span class="big">18 tickets</span>.`,
      consigne: "Combien font les 2/5 de 45 tickets ?",
      verification: { type: "courte", attendus: ["18"], unite: "tickets" },
      dessin: foraine(),
    },
    {
      tag: "Énigme 2 · À la pizzeria",
      titre: "La pizza partagée",
      question: `Une pizza est coupée en <b>8 parts égales</b>.<br>Ana mange ${frac(3, 8)} de la pizza.<br>Léo mange ${frac(2, 8)} de la pizza.<br><br>Quelle fraction de la pizza <b>reste-t-il</b> ?`,
      reponse: `Ils mangent ${frac(3, 8)} + ${frac(2, 8)} = ${frac(5, 8)}.<br>Même dénominateur : j'ajoute les numérateurs. 3 + 2 = 5.<br>La pizza entière, c'est ${frac(8, 8)}.<br>${frac(8, 8)} − ${frac(5, 8)} = ${frac(3, 8)}.<br>Il reste <span class="big">${frac(3, 8)} de la pizza</span>.`,
      consigne: "Une pizza en 8 parts : on mange 3/8 puis 2/8. Quelle fraction reste-t-il ?",
      verification: { type: "qcm", choix: ["5/8", "5/16", "3/8"], bonne: 2 },
      dessin: pizzeria(),
    },
    {
      tag: "Énigme 3 · Au bricolage",
      titre: "Le pot de peinture",
      question: `Ilyes repeint la porte avec ${frac(1, 4)} du pot.<br>Puis il repeint le volet avec ${frac(3, 8)} du pot.<br><br>Quelle fraction du pot a-t-il <b>utilisée en tout</b> ?`,
      reponse: `Les dénominateurs sont différents : 4 et 8.<br>8 = 4 × 2. Je change ${frac(1, 4)} en huitièmes.<br>${frac(1, 4)} = ${frac(2, 8)}, car 1 × 2 = 2 et 4 × 2 = 8.<br>${frac(2, 8)} + ${frac(3, 8)} = ${frac(5, 8)}.<br>Il a utilisé <span class="big">${frac(5, 8)} du pot</span>.`,
      consigne: "Combien font 1/4 + 3/8 ?",
      verification: { type: "qcm", choix: ["4/12", "5/8", "4/8"], bonne: 1 },
      dessin: bricolage(),
    },
    {
      tag: "Énigme 4 · Chez l'apiculteur",
      titre: "Le miel de la ruche",
      question: `La ruche de Pablo a <b>6 cadres</b>.<br>Chaque cadre donne ${frac(3, 4)} kg de miel.<br><br><b>Combien de kilos</b> de miel en tout ?`,
      reponse: `6 fois ${frac(3, 4)} kg : 6 × ${frac(3, 4)}.<br>Je multiplie le haut : 6 × 3 = 18. Cela fait ${frac(18, 4)} kg.<br>4 quarts font 1 kg. 18 quarts = 16 quarts + 2 quarts.<br>Donc 4 kg et ${frac(2, 4)} kg, soit 4 kg et demi.<br>Il y a <span class="big">4,5 kg de miel</span>.`,
      consigne: "Combien font 6 × 3/4 kg ? (en nombre décimal)",
      verification: { type: "courte", attendus: ["4,5", "4.5", "18/4", "9/2"], unite: "kg" },
      dessin: ruche(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux jus de Kenza",
      sorte: "piege",
      question: `Kenza verse ${frac(1, 4)} L de jus d'orange.<br>Puis elle ajoute ${frac(2, 4)} L de jus de mangue.<br>Elle dit : « J'ai ${frac(3, 8)} L de jus. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Kenza a ajouté les hauts <b>et</b> les bas.<br>Des quarts plus des quarts, ce sont des quarts.<br>On ajoute seulement les numérateurs : 1 + 2 = 3.<br>${frac(1, 4)} + ${frac(2, 4)} = ${frac(3, 4)}.<br>Kenza a <span class="big">${frac(3, 4)} L de jus</span>.<br>${frac(3, 8)} L, c'est moins que ${frac(2, 4)} L : impossible !`,
      consigne: "Combien font 1/4 L + 2/4 L ?",
      verification: { type: "qcm", choix: ["Non : 3/4 L", "Oui : 3/8 L", "Non : 3/16 L"], bonne: 0 },
      dessin: jus(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les sièges de l'avion",
      sorte: "defi",
      question: `Dans un avion, les ${frac(3, 5)} des sièges sont occupés.<br>Cela fait <b>120 passagers</b>.<br><br><b>Combien de sièges</b> a l'avion ?`,
      reponse: `${frac(3, 5)} des sièges, c'est 3 parts sur 5.<br>3 parts = 120 passagers.<br>1 part : 120 ÷ 3 = 40 sièges.<br>5 parts : 5 × 40 = 200 sièges.<br>On vérifie : ${frac(3, 5)} de 200 = 3 × 40 = 120.<br>L'avion a <span class="big">200 sièges</span>.`,
      consigne: "Les 3/5 des sièges font 120 sièges. Combien de sièges en tout ?",
      verification: { type: "courte", attendus: ["200"], unite: "sièges" },
      dessin: avion(),
    },
  ],
};

export default problemes;
