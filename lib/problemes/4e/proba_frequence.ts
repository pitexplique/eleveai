// Énigmes à projeter — 4e, notion proba_frequence (les lancers francs de Jade :
// fréquence en fraction, décimal et pourcentage, le jackpot du jeu télévisé :
// fréquence observée face à la probabilité, les dés de Rayan : la fréquence
// se rapproche de la probabilité, le sondage du collège : ce qu'un petit
// échantillon ne prouve pas, piège de la pêche « on divise par l'autre
// part », défi de la maternité : estimer une probabilité par une fréquence).
// Effectifs vérifiés (somme = total). Diagrammes au bon rapport : barres des
// dés à 12 px par point de pourcentage, barres du sondage et de la maternité
// à la proportion exacte. Pas de prix, pas de La Réunion ici. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Les lancers francs : 40 ronds (8 × 5), les 26 premiers pleins.
const lancers = () => {
  let ronds = "";
  for (let k = 0; k < 40; k++) {
    const x = 86 + 44 * (k % 8);
    const y = 150 + 44 * Math.floor(k / 8);
    ronds += k < 26
      ? `<circle cx="${x}" cy="${y}" r="15" fill="${C.jaune}"/>`
      : `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="${C.pale}" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Quarante ronds pour quarante lancers francs : 26 ronds pleins pour les paniers réussis, 14 ronds vides pour les ratés">
  <text x="240" y="70" font-size="44" text-anchor="middle">🏀</text>
  ${txt(240, 112, "40 lancers francs", C.craie, 22)}
  ${ronds}
  <circle cx="70" cy="382" r="13" fill="${C.jaune}"/>
  ${txt(92, 390, "réussi (26)", C.craie, 22, "start")}
  <circle cx="290" cy="382" r="12" fill="none" stroke="${C.pale}" stroke-width="3"/>
  ${txt(312, 390, "raté (14)", C.craie, 22, "start")}
  </svg>`;
};

// La roue du jeu : 4 parts égales, une seule « jackpot » (en haut à droite).
const roue = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une roue partagée en 4 parts égales, dont une seule est le jackpot ; sur 80 tours, le jackpot est sorti 22 fois">
  <circle cx="150" cy="210" r="110" fill="${C.bleu}" fill-opacity=".08" stroke="${C.craie}" stroke-width="3"/>
  <path d="M150 210 L150 100 A110 110 0 0 1 260 210 Z" fill="${C.jaune}" fill-opacity=".45"/>
  <path d="M40 210 L260 210 M150 100 L150 320" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <circle cx="150" cy="210" r="110" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M138 80 L162 80 L150 102 Z" fill="${C.rose}"/>
  <text x="198" y="176" font-size="34" text-anchor="middle">⭐</text>
  ${txt(150, 360, "4 parts égales", C.pale, 22)}
  ${txt(375, 150, "80 tours", C.craie, 24)}
  ${txt(375, 205, "⭐ jackpot", C.jaune, 24)}
  ${txt(375, 240, "22 fois", C.jaune, 24)}
  ${txt(375, 320, `écart${NB}?`, C.rose, 26)}
  </svg>`;

// Les dés : fréquence du 6, 12 px par point de %, base y = 340.
// 10 % → 120 px, 15 % → 180 px, 16,5 % → 198 px.
const des = () => {
  const Y = (p: number) => 340 - 12 * p;
  let grille = "";
  let nombres = "";
  for (const p of [5, 10, 15, 20]) {
    grille += `M80 ${Y(p)} L440 ${Y(p)} `;
    nombres += txt(72, Y(p) + 7, String(p), C.pale, 20, "end");
  }
  const barre = (x: number, p: number, etiq: string, val: string) =>
    `<rect x="${x - 35}" y="${r1(Y(p))}" width="70" height="${r1(12 * p)}" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="3"/>` +
    txt(x, Y(p) - 10, val, C.craie, 22) + txt(x, 368, etiq, C.craie, 22);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Diagramme en barres de la fréquence du 6 : 10 pour cent après 30 lancers, 15 pour cent après 300 lancers, 16,5 pour cent après 3 000 lancers">
  ${txt(240, 50, "fréquence du 6 (en %)", C.craie, 22)}
  <text x="440" y="62" font-size="36" text-anchor="middle">🎲</text>
  <path d="${grille}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".5" stroke-dasharray="5 5" fill="none"/>
  <path d="M80 340 L440 340 M80 340 L80 90" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(72, 347, "0", C.pale, 20, "end")}
  ${nombres}
  ${barre(160, 10, "30", "10 %")}
  ${barre(270, 15, "300", "15 %")}
  ${barre(380, 16.5, `3${NB}000`, "16,5 %")}
  ${txt(270, 400, "lancers", C.pale, 22)}
  </svg>`;
};

// Le sondage : deux barres de 300 px. Inès 8 sur 10 → 240 px (10 cases de
// 30 px) ; Hugo 400 sur 600 → 200 px.
const sondage = () => {
  let cases = "";
  for (let k = 1; k < 10; k++) cases += `M${90 + 30 * k} 160 L${90 + 30 * k} 200 `;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux sondages : Inès a 8 oui sur 10 élèves, Hugo a 400 oui sur 600 élèves ; les barres montrent la part des oui">
  <text x="240" y="70" font-size="44" text-anchor="middle">📋</text>
  ${txt(240, 145, `Inès${NB}: 8 oui sur 10`, C.craie, 22)}
  <rect x="90" y="160" width="240" height="40" fill="${C.bleu}" fill-opacity=".4"/>
  <rect x="90" y="160" width="300" height="40" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="${cases}" stroke="${C.craie}" stroke-width="1.5" fill="none"/>
  ${txt(240, 275, `Hugo${NB}: 400 oui sur 600`, C.craie, 22)}
  <rect x="90" y="290" width="200" height="40" fill="${C.jaune}" fill-opacity=".45"/>
  <rect x="90" y="290" width="300" height="40" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${txt(240, 390, `le plus fiable${NB}?`, C.rose, 24)}
  </svg>`;
};

// La pêche : 15 poissons, 6 truites (rose) et 9 perches (bleu).
const peche = () => {
  const poisson = (x: number, y: number, coul: string) =>
    `<ellipse cx="${x}" cy="${y}" rx="24" ry="13" fill="${coul}"/>` +
    `<path d="M${x + 20} ${y} L${x + 38} ${y - 12} L${x + 38} ${y + 12} Z" fill="${coul}"/>`;
  let banc = "";
  for (let k = 0; k < 15; k++) banc += poisson(80 + 75 * (k % 5), 130 + 55 * Math.floor(k / 5), k < 6 ? C.rose : C.bleu);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Quinze poissons pêchés : 6 truites en rose et 9 perches en bleu ; Lou dit que la fréquence des truites vaut 6 divisé par 9">
  <text x="240" y="70" font-size="44" text-anchor="middle">🎣</text>
  ${banc}
  ${poisson(80, 292, C.rose)}
  ${txt(128, 300, "truite", C.rose, 22, "start")}
  ${poisson(280, 292, C.bleu)}
  ${txt(328, 300, "perche", C.bleu, 22, "start")}
  <rect x="40" y="338" width="400" height="58" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 375, `Lou${NB}: «${NB}6 ÷ 9${NB}»`, C.rose, 24)}
  </svg>`;
};

// La maternité : barre de 400 px pour 10 000 naissances.
// 5 120 garçons → 204,8 px ; 4 880 filles → 195,2 px.
const maternite = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Sur 10 000 naissances, 5 120 garçons et 4 880 filles ; l'an prochain, 2 500 naissances sont attendues">
  <text x="240" y="70" font-size="44" text-anchor="middle">👶</text>
  ${txt(240, 130, `10${NB}000 naissances`, C.craie, 22)}
  <rect x="40" y="150" width="204.8" height="50" fill="${C.bleu}" fill-opacity=".4"/>
  <rect x="244.8" y="150" width="195.2" height="50" fill="${C.jaune}" fill-opacity=".4"/>
  <rect x="40" y="150" width="400" height="50" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${txt(142, 232, `5${NB}120 garçons`, C.bleu, 22)}
  ${txt(342, 232, `4${NB}880 filles`, C.jaune, 22)}
  ${txt(240, 300, "l'an prochain", C.pale, 22)}
  ${txt(240, 335, `2${NB}500 naissances`, C.craie, 24)}
  ${txt(240, 385, `combien de garçons${NB}?`, C.rose, 24)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "proba_frequence",
  titre: "Énigmes sur les fréquences et les probabilités",
  description: "Les lancers francs, le jackpot du jeu télévisé, les dés de Rayan, le sondage du collège, le piège de la pêche, le défi de la maternité : calculer une fréquence, la comparer à une probabilité, voir l'écart se réduire quand on répète, se méfier d'un petit échantillon.",
  problemes: [
    {
      tag: "Énigme 1 · Le basket",
      titre: "Les lancers francs",
      question: `Jade s'entraîne aux lancers francs.<br>Elle tire 40 fois.<br>Elle marque 26 paniers.<br><br>Quelle est la fréquence des paniers réussis ?<br>Écris-la en fraction, en décimal, puis en pourcentage.`,
      reponse: `Fréquence = nombre de réussites ÷ nombre d'essais.<br>En fraction : ${frac(26, 40)} = ${frac(13, 20)}.<br>En décimal : 26 ÷ 40 = 0,65.<br>En pourcentage : 0,65 × 100 = 65.<br>La fréquence est de <span class="big">65 %</span>.<br>Contrôle : 26 + 14 ratés = 40 lancers.`,
      consigne: "Quelle est la fréquence des paniers réussis, en pourcentage ?",
      verification: { type: "courte", attendus: ["65"], unite: "%" },
      dessin: lancers(),
    },
    {
      tag: "Énigme 2 · Le jeu télévisé",
      titre: "Le jackpot",
      question: `Au jeu télévisé, une roue a 4 parts égales.<br>Une seule part est le jackpot.<br>Sur 80 tours, le jackpot sort 22 fois.<br><br>De combien de points la fréquence observée dépasse-t-elle la probabilité ?`,
      reponse: `La probabilité du jackpot : 1 part sur 4, soit ${frac(1, 4)} = 25 %.<br>La fréquence observée : 22 ÷ 80 = 0,275, soit 27,5 %.<br>Écart : 27,5 − 25 = 2,5.<br>La fréquence dépasse la probabilité de <span class="big">2,5 points</span>.<br>On attendait 80 ÷ 4 = 20 jackpots. On en a eu 2 de plus.<br>C'est un petit écart : il est normal, il ne prouve rien.`,
      consigne: "De combien de points la fréquence dépasse-t-elle la probabilité ?",
      verification: { type: "courte", attendus: ["2,5"], unite: "points" },
      dessin: roue(),
    },
    {
      tag: "Énigme 3 · Les dés",
      titre: "Le 6 de Rayan",
      question: `Rayan lance un dé équilibré.<br>Il note la fréquence du 6.<br>Après 30 lancers : 10 %. Après 300 : 15 %. Après 3 000 : 16,5 %.<br><br>Il continue jusqu'à 30 000 lancers.<br>Quelle fréquence du 6 est la plus probable ?`,
      reponse: `Le dé est équilibré : la probabilité du 6 est ${frac(1, 6)}.<br>1 ÷ 6 ≈ 0,167, soit environ 16,7 % (arrondi au dixième).<br>Plus on lance, plus la fréquence se rapproche de la probabilité.<br>Après 30 000 lancers : <span class="big">environ 16,7 %</span>.<br>Elle ne va pas monter jusqu'à 25 %.<br>Le dé ne se « rattrape » pas : c'est la mesure qui devient fiable.`,
      consigne: "Après 30 000 lancers, quelle fréquence du 6 est la plus probable ?",
      verification: { type: "qcm", choix: ["10 %", "environ 16,7 %", "25 %"], bonne: 1 },
      dessin: des(),
    },
    {
      tag: "Énigme 4 · Le sondage du collège",
      titre: "Le club d'échecs",
      question: `Le collège veut ouvrir un club d'échecs le midi.<br>Inès interroge 10 élèves : 8 disent oui.<br>Hugo interroge 600 élèves : 400 disent oui.<br><br>Quel sondage est le plus fiable ?`,
      reponse: `Inès : 8 ÷ 10 = 0,8, soit 80 %.<br>Hugo : 400 ÷ 600 ≈ 0,667, soit environ 66,7 % (arrondi au dixième).<br>Sur 10 élèves, un seul avis de plus change le résultat de 10 points.<br>Sur 600 élèves, l'échantillon est bien plus grand.<br>Le plus fiable : <span class="big">le sondage de Hugo</span>.<br>Un pourcentage seul ne dit rien : on demande toujours « sur combien ? ».`,
      consigne: "Quel sondage est le plus fiable ?",
      verification: { type: "qcm", choix: ["Inès : 80 %, c'est plus fort", "Les deux se valent", "Hugo : il a interrogé bien plus d'élèves"], bonne: 2 },
      dessin: sondage(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les poissons de Lou",
      sorte: "piege",
      question: `Lou pêche à l'étang.<br>Elle attrape 6 truites et 9 perches.<br>Elle dit : « La fréquence des truites, c'est 6 ÷ 9. »<br><br><b>Quelle est la vraie fréquence des truites, en pourcentage ?</b>`,
      reponse: `Lou s'est trompée ! Elle a divisé par les perches.<br>6 ÷ 9 compare les truites aux perches : c'est un ratio.<br>Une fréquence se divise par le TOTAL.<br>Total : 6 + 9 = 15 poissons.<br>6 ÷ 15 = 0,4, soit ${frac(2, 5)}.<br>La fréquence des truites est de <span class="big">40 %</span>.`,
      consigne: "Quelle est la fréquence des truites, en pourcentage ?",
      verification: { type: "courte", attendus: ["40"], unite: "%" },
      dessin: peche(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les bébés de la maternité",
      sorte: "defi",
      question: `Une grande maternité compte ses naissances.<br>Sur 10 000 bébés, 5 120 sont des garçons.<br>On ne peut pas calculer la probabilité d'avoir un garçon : on l'estime.<br>L'an prochain, on attend 2 500 naissances.<br><br>Combien de garçons environ ?`,
      reponse: `Fréquence des garçons : 5 120 ÷ 10 000 = 0,512, soit 51,2 %.<br>10 000 naissances, c'est beaucoup : cette fréquence est une bonne estimation.<br>2 500 × 0,512 = 1 280.<br>On peut attendre <span class="big">environ 1 280 garçons</span>.<br>Contrôle : 2 500 est le quart de 10 000, et 5 120 ÷ 4 = 1 280.<br>C'est une estimation, pas une certitude.`,
      consigne: "Combien de garçons environ peut-on attendre sur 2 500 naissances ?",
      verification: { type: "courte", attendus: ["1280"], unite: "garçons" },
      dessin: maternite(),
    },
  ],
};

export default problemes;
